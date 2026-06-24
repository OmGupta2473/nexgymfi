import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  autoCheckIn,
  getPublicMemberList,
  registerDevice,
} from '../api/attendance.api';
import type { PublicMember } from '../api/types';
import { formatDateTime, getErrorMessage } from '../utils/format';

type CheckInState = 'checking' | 'linked' | 'needs-device' | 'success' | 'error';

const getDeviceToken = (gymSlug: string) => {
  const key = `gymflex.device.${gymSlug}`;
  const existing = localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  const token = crypto.randomUUID();
  localStorage.setItem(key, token);
  return token;
};

const getFingerprint = () =>
  btoa(
    Array.from(
      new TextEncoder().encode(
        [
          navigator.userAgent,
          navigator.language,
          screen.width,
          screen.height,
          Intl.DateTimeFormat().resolvedOptions().timeZone,
        ].join('|'),
      ),
    )
      .map((byte) => String.fromCharCode(byte))
      .join(''),
  );

export const CheckInPage = () => {
  const { gymSlug = '' } = useParams();
  const [state, setState] = useState<CheckInState>('checking');
  const [message, setMessage] = useState('');
  const [members, setMembers] = useState<PublicMember[]>([]);
  const [memberId, setMemberId] = useState('');
  const [recordTime, setRecordTime] = useState('');

  const deviceToken = useMemo(() => getDeviceToken(gymSlug), [gymSlug]);
  const fingerprint = useMemo(() => getFingerprint(), []);

  const runAutoCheckIn = async () => {
    setState('checking');
    setMessage('');

    try {
      const record = await autoCheckIn({ gymSlug, deviceToken, fingerprint });
      setRecordTime(record.checkedInAt);
      setState('success');
    } catch (err) {
      const nextMessage = getErrorMessage(err);

      if (nextMessage.includes('DEVICE_NOT_LINKED')) {
        const list = await getPublicMemberList(gymSlug);
        setMembers(list);
        setState('needs-device');
        setMessage('Choose your member profile once to link this phone.');
        return;
      }

      setState('error');
      setMessage(nextMessage);
    }
  };

  useEffect(() => {
    if (gymSlug) {
      void runAutoCheckIn();
    }
  }, [gymSlug]);

  const handleRegister = async () => {
    if (!memberId) {
      setMessage('Select your name first.');
      return;
    }

    setState('checking');
    setMessage('');

    try {
      await registerDevice({
        memberId,
        gymSlug,
        deviceToken,
        fingerprint,
        label: navigator.userAgent.slice(0, 80),
      });
      await runAutoCheckIn();
    } catch (err) {
      setState('error');
      setMessage(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center">
        <div className="rounded-lg border border-white/10 bg-white p-6 text-zinc-950 shadow-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-teal-700">
            {gymSlug}
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            QR check-in
          </h1>

          {state === 'checking' ? (
            <div className="mt-6 rounded-md bg-zinc-50 p-4 text-sm text-zinc-600">
              Checking this phone...
            </div>
          ) : null}

          {state === 'success' ? (
            <div className="mt-6 rounded-md border border-teal-200 bg-teal-50 p-4 text-teal-800">
              <p className="font-semibold">Checked in successfully</p>
              <p className="mt-1 text-sm">{formatDateTime(recordTime)}</p>
            </div>
          ) : null}

          {state === 'needs-device' ? (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-zinc-600">{message}</p>
              <select
                value={memberId}
                onChange={(event) => setMemberId(event.target.value)}
                className="h-11 w-full rounded-md border border-zinc-300 px-3 text-sm"
              >
                <option value="">Select your name</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => void handleRegister()}
                className="h-11 w-full rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white"
              >
                Link phone and check in
              </button>
            </div>
          ) : null}

          {state === 'error' ? (
            <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {message}
            </div>
          ) : null}

          <Link
            to="/"
            className="mt-6 inline-block text-sm font-medium text-zinc-500 hover:text-zinc-900"
          >
            Back to GymFlex
          </Link>
        </div>
      </div>
    </div>
  );
};

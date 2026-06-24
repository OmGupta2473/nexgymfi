import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../context/AuthContext';

export const QRPrint = () => {
  const { user } = useAuth();
  
  // The static URL that will be pasted on the gym wall
  const checkInUrl = `${window.location.origin}/checkin/${user?.gym?.slug}`;

  return (
    <div className="p-10 bg-white text-black min-h-screen flex flex-col items-center">
      <div className="border-4 border-black p-8 text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-black uppercase">SCAN TO CHECK-IN</h1>
        <p className="text-xl font-bold">{user?.gym?.name}</p>
        
        <div className="flex justify-center p-4 bg-white">
          <QRCodeSVG value={checkInUrl} size={256} level="H" />
        </div>

        <p className="text-sm font-mono">{checkInUrl}</p>
        
        <div className="pt-4">
          <button 
            onClick={() => window.print()}
            className="bg-black text-white px-6 py-2 rounded no-print"
          >
            PRINT FOR WALL
          </button>
        </div>
      </div>
    </div>
  );
};
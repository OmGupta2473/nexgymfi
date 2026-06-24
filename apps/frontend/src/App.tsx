import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LandingPage } from './LandingPage';
import { AuditPage } from './pages/AuditPage';
import { AttendancePage } from './pages/AttendancePage';
import { CheckInPage } from './pages/CheckInPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { MembersPage } from './pages/MembersPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { PlansPage } from './pages/PlansPage';
import { QRPrint } from './pages/dashboard/QRPrint';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage onEnterApp={() => window.location.assign('/login')} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkin/:gymSlug" element={<CheckInPage />} />
        <Route
          path="/qr-print"
          element={
            <PrivateRoute>
              <QRPrint />
            </PrivateRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/audit" element={<AuditPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

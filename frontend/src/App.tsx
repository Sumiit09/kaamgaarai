import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

import LandingPage from './pages/landing/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import Verify from './pages/auth/Verify';
import Onboarding from './pages/onboarding/Onboarding';

import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import AIEmployee from './pages/dashboard/AIEmployee';
import Inbox from './pages/dashboard/Inbox';
import Bookings from './pages/dashboard/Bookings';
import Customers from './pages/dashboard/Customers';
import Analytics from './pages/dashboard/Analytics';
import KnowledgeBase from './pages/dashboard/KnowledgeBase';
import Integrations from './pages/dashboard/Integrations';
import Billing from './pages/dashboard/Billing';
import Settings from './pages/dashboard/Settings';
import BusinessCalendar from './pages/dashboard/BusinessCalendar';
import EmergencyMode from './pages/dashboard/EmergencyMode';
import BroadcastCenter from './pages/dashboard/BroadcastCenter';
import BusinessProfile from './pages/dashboard/BusinessProfile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/onboarding" element={<Onboarding />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="ai-employee" element={<AIEmployee />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="customers" element={<Customers />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
            <Route path="calendar" element={<BusinessCalendar />} />
            <Route path="emergency" element={<EmergencyMode />} />
            <Route path="broadcast" element={<BroadcastCenter />} />
            <Route path="business-profile" element={<BusinessProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
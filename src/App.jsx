import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DoctorProvider } from './context/DoctorContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';
import DoctorLayout from './components/common/DoctorLayout';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifyOtp from './pages/VerifyOtp';
import Dashboard from './pages/Dashboard';
import Consultations from './pages/Consultations';
import LabTests from './pages/LabTests';
import Profile from './pages/Profile';
import DoctorPortal from './pages/DoctorPortal';
import ServiceDetails from './pages/ServiceDetails';
import SymptomQuestionnaire from './pages/SymptomQuestionnaire';
import AppointmentBooking from './pages/AppointmentBooking';
import DoctorDashboard from './pages/doctors/DoctorDashboard';
import DoctorAppointments from './pages/doctors/DoctorAppointments';
import DoctorProfile from './pages/doctors/DoctorProfile';
import DoctorConsultationHub from './pages/doctors/DoctorConsultationHub';
import DoctorConsultationRoom from './pages/doctors/DoctorConsultationRoom';
import PatientConsultationHub from './pages/PatientConsultationHub';
import PatientCallPage from './pages/PatientCallPage';
import DoctorCallPage from './pages/doctors/DoctorCallPage';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DoctorProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />

            {/* Patient protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/consultations" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Layout><Consultations /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/consultation-hub" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Layout><PatientConsultationHub /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/lab-tests" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Layout><LabTests /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Layout><Profile /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/doctor-portal" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Layout><DoctorPortal /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/service/:slug" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Layout><ServiceDetails /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/symptom-check" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Layout><SymptomQuestionnaire /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/book-appointment/:doctorId" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Layout><AppointmentBooking /></Layout>
              </ProtectedRoute>
            } />

            {/* Doctor protected routes */}
            <Route path="/doctor/dashboard" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorLayout><DoctorDashboard /></DoctorLayout>
              </ProtectedRoute>
            } />
            <Route path="/doctor/appointments" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorLayout><DoctorAppointments /></DoctorLayout>
              </ProtectedRoute>
            } />
            <Route path="/doctor/consultation-hub" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorLayout><DoctorConsultationHub /></DoctorLayout>
              </ProtectedRoute>
            } />
            <Route path="/doctor/consultation-hub/:appointmentId" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorLayout><DoctorConsultationRoom /></DoctorLayout>
              </ProtectedRoute>
            } />
            <Route path="/doctor/profile" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorLayout><DoctorProfile /></DoctorLayout>
              </ProtectedRoute>
            } />
            //video call routes///
            <Route path="/consultation-hub/call/:appointmentId" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Layout><PatientCallPage /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/doctor/consultation-hub/call/:appointmentId" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorLayout><DoctorCallPage /></DoctorLayout>
              </ProtectedRoute>
            } />


          </Routes>
        </DoctorProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
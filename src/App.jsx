import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DoctorProvider } from './context/DoctorContext';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import Consultations from './pages/Consultations';
import LabTests from './pages/LabTests';
import Profile from './pages/Profile';
import DoctorPortal from './pages/DoctorPortal';
import ServiceDetails from './pages/ServiceDetails';
import SymptomQuestionnaire from './pages/SymptomQuestionnaire';
import AppointmentBooking from './pages/AppointmentBooking';

function App() {
  return (
    <BrowserRouter>
      <DoctorProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/consultations" element={<Consultations />} />
            <Route path="/lab-tests" element={<LabTests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/doctor-portal" element={<DoctorPortal />} />
            <Route path="/service/:slug" element={<ServiceDetails />} />
            <Route path="/symptom-check" element={<SymptomQuestionnaire />} />
            <Route path="/book-appointment/:doctorId" element={<AppointmentBooking />} />
          </Routes>
        </Layout>
      </DoctorProvider>
    </BrowserRouter>
  );
}

export default App;
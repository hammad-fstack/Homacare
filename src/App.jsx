import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import Consultations from './pages/Consultations';
import LabTests from './pages/LabTests';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import DoctorSelection from './pages/DoctorSelection';
import AppointmentBooking from './pages/AppointmentBooking';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/lab-tests" element={<LabTests />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/book-appointment" element={<DoctorSelection />} />
          <Route path="/book-appointment/:doctorId" element={<AppointmentBooking />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
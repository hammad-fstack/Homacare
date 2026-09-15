import { useParams } from 'react-router-dom';
import { useAppointments } from '../hooks/useAppointments';
import ConsultationRoom from '../components/consultations/ConsultationRoom';

const PatientCallPage = () => {
  const { appointmentId } = useParams();
  const { appointments, loading } = useAppointments();

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;
  const appt = appointments.find((a) => String(a.id) === appointmentId);
  if (!appt) return <div className="p-6 text-sm text-gray-400">Appointment not found</div>;

  return <ConsultationRoom appointment={appt} role="patient" patientInitial={appt.doctor_name?.[0] || '?'} />;
};

export default PatientCallPage;
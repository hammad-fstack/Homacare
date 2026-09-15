import { useParams } from 'react-router-dom';
import { useDoctorAppointments } from '../../hooks/useDoctorAppointments';
import ConsultationRoom from '../../components/consultations/ConsultationRoom';

const DoctorCallPage = () => {
  const { appointmentId } = useParams();
  const { appointments, loading } = useDoctorAppointments();

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;
  const appt = appointments.find((a) => String(a.id) === appointmentId);
  if (!appt) return <div className="p-6 text-sm text-gray-400">Appointment not found</div>;

  return <ConsultationRoom appointment={appt} role="doctor" patientInitial={appt.patient_name?.[0] || '?'} />;
};

export default DoctorCallPage;
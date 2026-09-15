import { useParams } from 'react-router-dom';
import { Search, Bell, Globe } from 'lucide-react';
import { useDoctorAppointments } from '../../hooks/useDoctorAppointments';
import ConsultationRoom from '../../components/consultations/ConsultationRoom';

const DoctorConsultationRoom = () => {
  const { appointmentId } = useParams();
  const { appointments, loading } = useDoctorAppointments();

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;
  const appt = appointments.find((a) => String(a.id) === appointmentId);
  if (!appt) return <div className="p-6 text-sm text-gray-400">Appointment not found</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Consultation Hub</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input placeholder="Search" className="bg-gray-100 text-gray-600 text-xs rounded-lg pl-3 pr-8 py-2 w-48 outline-none" />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"><Globe className="w-4 h-4 text-gray-600" /></button>
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"><Bell className="w-4 h-4 text-gray-600" /></button>
        </div>
      </div>
      <ConsultationRoom appointment={appt} role="doctor" patientInitial={appt.patient_name?.[0] || '?'} />
    </div>
  );
};

export default DoctorConsultationRoom;
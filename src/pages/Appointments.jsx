import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../hooks/useAppointments';
import EmptyState from '../components/common/EmptyState';
import AppointmentCard from '../components/appointment/AppointmentCard';

const Appointments = () => {
  const navigate = useNavigate();
  const { appointments, loading } = useAppointments();

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Take charge of your wellness</h2>
        <p className="text-xs text-gray-400 mt-1">
          Stay informed about your consultations, lab tests, and treatments
        </p>
      </div>

      {appointments.length > 0 ? (
        <div className="space-y-3">
          {appointments.map((a) => (
            <AppointmentCard key={a.id} appointment={a} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="📅"
          message="No appointments yet"
          actionLabel="Book a consultation"
          onAction={() => navigate('/book-appointment')}
        />
      )}
    </div>
  );
};

export default Appointments;
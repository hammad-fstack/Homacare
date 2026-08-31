import { useNavigate, useParams } from 'react-router-dom';
import { useDoctors } from '../hooks/useDoctors';
import { useBookingFlow, BOOKING_STEPS } from '../hooks/useBookingFlow';
import AssignedSpecialist from '../components/appointment/AssignedSpecialist';
import ScheduleSelector from '../components/appointment/ScheduleSelector';
import PaymentForm from '../components/appointment/PaymentForm';
import ConfirmationModal from '../components/appointment/ConfirmationModal';
import WaitingScreen from '../components/appointment/WaitingScreen';
import PageHeader from '../components/common/PageHeader';

const AppointmentBooking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { doctors, loading } = useDoctors();
  const { step, goToPayment, goToConfirmation, goToWaiting } = useBookingFlow();

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;

const doctor = doctors.find((d) => String(d.id) === String(doctorId));
  if (!doctor) return <div className="p-6 text-sm text-gray-400">Doctor not found</div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Appointment" />

      <div>
        <h2 className="text-lg font-semibold text-gray-900">Your Assigned Specialist</h2>
        <p className="text-xs text-gray-400 mt-1">Book your consultation with ease</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssignedSpecialist doctor={doctor} />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {step === BOOKING_STEPS.SCHEDULE && (
            <ScheduleSelector
              doctor={doctor}
              onContinue={goToPayment}
              onRetakeSurvey={() => navigate('/survey')}
              onChooseAnotherDoctor={() => navigate('/book-appointment')}
            />
          )}

          {step === BOOKING_STEPS.PAYMENT && (
            <>
              <h3 className="font-bold text-gray-900 mb-1">Confirm Your Doctor Consultation</h3>
              <p className="text-xs text-gray-400 mb-4">Enter your payment to schedule your consultation</p>
              <PaymentForm onPay={goToConfirmation} />
            </>
          )}

          {step === BOOKING_STEPS.WAITING && <WaitingScreen />}
        </div>
      </div>

      {step === BOOKING_STEPS.CONFIRMATION && (
        <ConfirmationModal doctorName={doctor.name} onOkay={goToWaiting} />
      )}
    </div>
  );
};

export default AppointmentBooking;
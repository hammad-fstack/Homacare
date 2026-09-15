import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctorById } from '../hooks/useDoctors';
import { useBookingFlow, BOOKING_STEPS } from '../hooks/useBookingFlow';
import { API_BASE_URL } from '../config/api';
import ScheduleSelector from '../components/appointment/ScheduleSelector';
import OrderSummary from '../components/appointment/OrderSummary';
import PaymentForm from '../components/appointment/PaymentForm';
import WaitingScreen from '../components/appointment/WaitingScreen';

const AppointmentBooking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { doctor, loading, error } = useDoctorById(doctorId);
  const { step, bookingDetails, goToOrderSummary, goToPayment, goBackToSchedule, goToWaiting } = useBookingFlow();
  const [bookingError, setBookingError] = useState('');

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading doctor...</div>;

  if (error || !doctor) {
    return (
      <div className="p-6 text-center space-y-3">
        <p className="text-sm text-gray-400">Doctor not found</p>
        <button onClick={() => navigate('/doctor-portal')} className="text-emerald-600 text-sm font-medium underline">
          Available doctors dekhein
        </button>
      </div>
    );
  }

  const service = { title: `Consultation with ${doctor.name}`, price: doctor.consultationFee || 500 };

  const handlePaymentComplete = async (paymentDetails) => {
    setBookingError('');
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          doctorId: doctor.id,
          date: bookingDetails.fullDate,
          startTime: bookingDetails.time24,
          durationMinutes: bookingDetails.duration,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');

      goToWaiting(paymentDetails);
    } catch (err) {
      setBookingError(err.message);
    }
  };

  const appointmentDateTime = bookingDetails
    ? `${bookingDetails.fullDate}T${bookingDetails.time24}:00`
    : new Date(Date.now() + 6 * 3600000).toISOString();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Assigned Specialist</h1>
          <p className="text-xs text-gray-400">Book your consultation with Ease</p>
        </div>
        <button onClick={() => navigate('/doctor-portal')} className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg">
          Choose another doctor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden relative">
          <img src={doctor.avatar} alt={doctor.name} className="w-full h-96 object-cover" style={{ objectPosition: 'center 20%' }} />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="text-[10px] bg-white/90 text-gray-700 px-2 py-1 rounded-full">{doctor.specialty}</span>
            <span className="text-[10px] bg-white/90 text-gray-700 px-2 py-1 rounded-full">{doctor.experience}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white font-bold">{doctor.name}</h3>
            <p className="text-white/80 text-xs mt-1">{doctor.bio}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {step === BOOKING_STEPS.SCHEDULE && (
            <>
              <h3 className="font-bold text-gray-900 mb-1">Schedule Your Consultation</h3>
              <p className="text-xs text-gray-400 mb-4">
                Select a day and time that best fits your schedule. Your session will be private, secure, and last about 60 minutes.
              </p>
              <ScheduleSelector doctorId={doctor.id} onContinue={goToOrderSummary} />
            </>
          )}

          {step === BOOKING_STEPS.ORDER_SUMMARY && (
            <OrderSummary service={service} onConfirm={goToPayment} />
          )}

          {step === BOOKING_STEPS.PAYMENT && (
            <>
              <PaymentForm onPay={handlePaymentComplete} onChangeTime={goBackToSchedule} />
              {bookingError && <p className="text-xs text-red-500 mt-3">{bookingError}</p>}
            </>
          )}

          {step === BOOKING_STEPS.WAITING && (
            <WaitingScreen appointmentDateTime={appointmentDateTime} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
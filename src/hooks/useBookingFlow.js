import { useState } from 'react';

export const BOOKING_STEPS = {
  SCHEDULE: 'schedule',
  PAYMENT: 'payment',
  WAITING: 'waiting',
};

export const useBookingFlow = () => {
  const [step, setStep] = useState(BOOKING_STEPS.SCHEDULE);
  const [bookingDetails, setBookingDetails] = useState(null);

  const goToPayment = (scheduleDetails) => {
    setBookingDetails(scheduleDetails);
    setStep(BOOKING_STEPS.PAYMENT);
  };

  const goToWaiting = (paymentDetails) => {
    setBookingDetails((prev) => ({ ...prev, ...paymentDetails }));
    setStep(BOOKING_STEPS.WAITING);
  };

  return { step, bookingDetails, goToPayment, goToWaiting };
};
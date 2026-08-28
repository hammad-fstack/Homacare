import { useState } from 'react';

export const BOOKING_STEPS = {
  SCHEDULE: 'schedule',
  PAYMENT: 'payment',
  CONFIRMATION: 'confirmation',
  WAITING: 'waiting',
};

export const useBookingFlow = () => {
  const [step, setStep] = useState(BOOKING_STEPS.SCHEDULE);
  const [bookingDetails, setBookingDetails] = useState(null);

  const goToPayment = (scheduleDetails) => {
    setBookingDetails(scheduleDetails);
    setStep(BOOKING_STEPS.PAYMENT);
  };

  const goToConfirmation = (paymentDetails) => {
    setBookingDetails((prev) => ({ ...prev, ...paymentDetails }));
    setStep(BOOKING_STEPS.CONFIRMATION);
  };

  const goToWaiting = () => {
    setStep(BOOKING_STEPS.WAITING);
  };

  return { step, bookingDetails, goToPayment, goToConfirmation, goToWaiting };
};
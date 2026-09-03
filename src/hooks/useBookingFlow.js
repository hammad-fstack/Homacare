import { useState } from 'react';

export const BOOKING_STEPS = {
  SCHEDULE: 'schedule',
  ORDER_SUMMARY: 'order_summary',
  PAYMENT: 'payment',
  WAITING: 'waiting',
};

// State Machine Pattern — schedule -> order_summary -> payment -> waiting
export const useBookingFlow = () => {
  const [step, setStep] = useState(BOOKING_STEPS.SCHEDULE);
  const [bookingDetails, setBookingDetails] = useState(null);

  const goToOrderSummary = (scheduleDetails) => {
    setBookingDetails(scheduleDetails);
    setStep(BOOKING_STEPS.ORDER_SUMMARY);
  };

  const goToPayment = () => setStep(BOOKING_STEPS.PAYMENT);
  const goBackToSchedule = () => setStep(BOOKING_STEPS.SCHEDULE);

  const goToWaiting = (paymentDetails) => {
    setBookingDetails((prev) => ({ ...prev, ...paymentDetails, bookedAt: new Date().toISOString() }));
    setStep(BOOKING_STEPS.WAITING);
  };

  return { step, bookingDetails, goToOrderSummary, goToPayment, goBackToSchedule, goToWaiting };
};
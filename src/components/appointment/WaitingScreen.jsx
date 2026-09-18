import { useState, useEffect } from 'react';

const getTimeLeft = (targetDate) => {
  const diff = new Date(targetDate) - new Date();
  if (diff <= 0) return { h: 0, m: 0, s: 0, expired: true };
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
};

// Encapsulation — countdown logic asal appointment date se calculate hoti hai,
// koi hardcoded value nahi
const WaitingScreen = ({ appointmentDateTime, appointmentId, role }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(appointmentDateTime));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(appointmentDateTime)), 1000);
    return () => clearInterval(interval);
  }, [appointmentDateTime]);

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <p className="text-sm text-gray-500">Your Consultation Starts In</p>
      <p className="text-2xl font-bold text-gray-900">
        {timeLeft.expired ? "It's time!" : `${timeLeft.h}h ${timeLeft.m}m ${timeLeft.s}s`}
      </p>
      <button disabled={!timeLeft.expired}
        className={`text-sm font-medium px-6 py-2.5 rounded-lg text-white ${timeLeft.expired ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-gray-300 cursor-not-allowed'
          }`}>
        Start Now
      </button>
      <button className="text-xs text-red-500 hover:underline">Cancel Consultation</button>
    </div>
  );
};

export default WaitingScreen;
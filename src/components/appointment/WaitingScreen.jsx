import { useState, useEffect } from 'react';

const WaitingScreen = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 6, m: 0, s: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else if (m > 0) { m--; s = 59; }
        else if (h > 0) { h--; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <p className="text-sm text-gray-500">Your Consultation Starts In</p>
      <p className="text-2xl font-bold text-gray-900">
        {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
      </p>
      <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg">
        Start Now
      </button>
      <button className="text-xs text-red-500 hover:underline">Cancel Consultation</button>
    </div>
  );
};

export default WaitingScreen;
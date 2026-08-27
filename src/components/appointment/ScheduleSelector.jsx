import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { WEEK_DAYS, SESSION_DURATIONS, TIME_SLOTS } from '../../config/appointmentConfig';

const ScheduleSelector = ({ onContinue, onRetakeSurvey, onChooseAnotherDoctor }) => {
  const [selectedDay, setSelectedDay] = useState(WEEK_DAYS[0].date);
  const [duration, setDuration] = useState(30);
  const [time, setTime] = useState(TIME_SLOTS[0].time);
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!time) {
      setError('Pehle ek time slot select karein');
      return;
    }
    setError('');
    onContinue({ date: selectedDay, duration, time });
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-bold text-gray-900 text-lg mb-1">Schedule Your Consultation</h3>
        <p className="text-xs text-gray-400">
          Select a day and time that best fits your schedule. Your session will be private, secure, and last about 60 minutes.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Calendar className="w-4 h-4 text-gray-400" />
          September 01, 2025
        </div>
        <div className="flex gap-1">
          <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {WEEK_DAYS.map((d) => (
          <button
            key={d.date}
            onClick={() => setSelectedDay(d.date)}
            className={`text-[11px] py-2 rounded-lg font-medium ${
              selectedDay === d.date ? 'bg-emerald-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="block">{d.label}</span>
            <span className="block">{d.date}</span>
          </button>
        ))}
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800 mb-2">Session Duration</p>
        <div className="grid grid-cols-3 gap-2">
          {SESSION_DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`text-xs py-2 rounded-lg font-medium ${
                duration === d ? 'bg-emerald-50 text-emerald-600 border border-emerald-400' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {d} min
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800 mb-2">Session Time</p>
        <div className="grid grid-cols-4 gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot.time}
              disabled={slot.disabled}
              onClick={() => setTime(slot.time)}
              className={`text-[11px] py-2 rounded-lg font-medium ${
                slot.disabled
                  ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                  : time === slot.time
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-400'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleContinue}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
        >
          Accept &amp; Continue
        </button>
        <button
          onClick={onRetakeSurvey}
          className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50"
        >
          Retake Survey
        </button>
        <button
          onClick={onChooseAnotherDoctor}
          className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50"
        >
          Choose another doctor
        </button>
      </div>
    </div>
  );
};

export default ScheduleSelector;
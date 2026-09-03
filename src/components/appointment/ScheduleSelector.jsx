import { useState } from 'react';

const DURATIONS = [
  { min: 15, price: 150 },
  { min: 30, price: 300 },
  { min: 45, price: 450 },
  { min: 60, price: 600 },
];

const TIME_SLOTS = ['12:30','12:45','13:00','13:15','13:30','13:45','14:00','14:15','14:30','14:45','15:00','15:15','15:30','15:45','16:00','16:15','16:30','16:45','17:00','17:15','17:30','17:45','18:00','18:15','18:30','18:45','19:00','19:15','19:30','19:45'];

const getWeekDays = (start) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
};

const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const ScheduleSelector = ({ onContinue }) => {
  const [weekStart, setWeekStart] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState(15);
  const [time, setTime] = useState(null);
  const [error, setError] = useState('');

  const weekDays = getWeekDays(weekStart);

  const shiftWeek = (dir) => {
    const newStart = new Date(weekStart);
    newStart.setDate(weekStart.getDate() + dir * 7);
    setWeekStart(newStart);
  };

  const handleContinue = () => {
    if (!time) {
      setError('Pehle ek time slot select karein');
      return;
    }
    setError('');
    const [h, m] = time.split(':');
    const fullDate = selectedDate.toISOString().split('T')[0];
    onContinue({ date: selectedDate.getDate(), fullDate, time24: `${h}:${m}`, time, duration });
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-800 bg-gray-50 px-3 py-1.5 rounded-lg">
          {weekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
        <div className="flex gap-2">
          <button onClick={() => shiftWeek(-1)} className="text-gray-400 hover:text-gray-700">&lt;</button>
          <button onClick={() => shiftWeek(1)} className="text-gray-400 hover:text-gray-700">&gt;</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {weekDays.map((d) => {
          const isSelected = d.toDateString() === selectedDate.toDateString();
          return (
            <button
              key={d.toISOString()}
              onClick={() => setSelectedDate(d)}
              className={`text-[11px] py-2 rounded-lg font-medium ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600'}`}
            >
              <span className="block">{DAY_LABELS[d.getDay()]}</span>
              <span className="block">{String(d.getDate()).padStart(2, '0')}</span>
            </button>
          );
        })}
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800 mb-2">Session Duration</p>
        <div className="flex gap-2 flex-wrap">
          {DURATIONS.map((d) => (
            <button
              key={d.min}
              onClick={() => setDuration(d.min)}
              className={`text-xs px-4 py-1.5 rounded-lg font-medium flex flex-col items-center ${
                duration === d.min ? 'bg-emerald-50 text-emerald-600 border border-emerald-400' : 'bg-gray-50 text-gray-600'
              }`}
            >
              <span>{d.min} min</span>
              <span className="text-[10px]">{d.price} SAR</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800 mb-2">Session Time</p>
        <div className="grid grid-cols-4 gap-2">
          {TIME_SLOTS.map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={`text-[11px] py-2 rounded-lg font-medium ${time === t ? 'bg-emerald-500 text-white' : 'bg-gray-50 text-gray-600'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg">Retake Survey</button>
        <button onClick={handleContinue} className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg">
          Accept &amp; Continue
        </button>
      </div>
    </div>
  );
};

export default ScheduleSelector;
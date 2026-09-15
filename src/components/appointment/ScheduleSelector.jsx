import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/api';

const DURATIONS = [
  { min: 15, price: 150 },
  { min: 30, price: 300 },
  { min: 45, price: 450 },
  { min: 60, price: 600 },
];

const getWeekDays = (start) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
};

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ScheduleSelector = ({ doctorId, onContinue }) => {
  const [weekStart, setWeekStart] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState(15);
  const [time, setTime] = useState(null);
  const [error, setError] = useState('');
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const weekDays = getWeekDays(weekStart);

  useEffect(() => {
    if (!doctorId) return;
    const fetchSlots = async () => {
      setLoadingSlots(true);
      setTime(null);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const res = await fetch(
          `${API_BASE_URL}/doctors/${doctorId}/availability?date=${dateStr}&duration=${duration}`,
          { credentials: 'include' }
        );
        const data = await res.json();
        setSlots(data.availableSlots || []);
      } catch (err) {
        console.error(err);
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [doctorId, selectedDate, duration]);

  const shiftWeek = (dir) => {
    const newStart = new Date(weekStart);
    newStart.setDate(weekStart.getDate() + dir * 7);
    setWeekStart(newStart);
  };

  const handleContinue = () => {
    if (!time) {
      setError('Please Select a Time zone');
      return;
    }
    setError('');
    const time24 = time.split(' - ')[0];
    const fullDate = selectedDate.toISOString().split('T')[0];
    onContinue({ date: selectedDate.getDate(), fullDate, time24, time, duration });
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
        {loadingSlots ? (
          <p className="text-xs text-gray-400">Loading available slots...</p>
        ) : slots.length > 0 ? (
          <div className="grid grid-cols-4 gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setTime(slot)}
                className={`text-[11px] py-2 rounded-lg font-medium ${time === slot ? 'bg-emerald-500 text-white' : 'bg-gray-50 text-gray-600'}`}
              >
                {slot.split(' - ')[0]}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">No slots available for this day</p>
        )}
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
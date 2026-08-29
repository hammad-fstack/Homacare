import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { WEEK_DAYS, SESSION_DURATIONS } from '../../config/appointmentConfig';
import { useDoctorSchedule } from '../../hooks/useDoctorSchedule';
import { calculatePrice } from '../../utils/scheduleUtils';

const ScheduleSelector = ({ doctor, onContinue, onRetakeSurvey, onChooseAnotherDoctor }) => {
  const [selectedDay, setSelectedDay] = useState(WEEK_DAYS[0]);
  const [duration, setDuration] = useState(SESSION_DURATIONS[0]);
  const [time, setTime] = useState(null);
  const [error, setError] = useState('');

  const scheduleData = useDoctorSchedule(doctor.id, duration);
  const schedule = scheduleData.schedule;
  const loading = scheduleData.loading;
  const price = calculatePrice(doctor, duration);

  useEffect(() => {
    setTime(null);
  }, [duration]);

  const isDayOff = schedule.offDays.includes(selectedDay.label);
  const daySlots = schedule.slotsByDay[selectedDay.label] || [];

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setTime(null);
  };

  const handleContinue = () => {
    if (!time) {
      setError('Please select a time slot first');
      return;
    }
    setError('');
    onContinue({ day: selectedDay.label, date: selectedDay.date, duration: duration, time: time, price: price.formatted });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-gray-900 text-xl mb-1.5">Schedule Your Consultation</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Select a day and time that best fits your schedule. Your session will be private and secure.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          September 2025
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {WEEK_DAYS.map(function (d) {
          const off = schedule.offDays.includes(d.label);
          let btnClass = 'text-xs py-2.5 rounded-xl font-medium transition-colors ';
          if (off) {
            btnClass += 'bg-gray-50 text-gray-300 cursor-not-allowed';
          } else if (selectedDay.date === d.date) {
            btnClass += 'bg-indigo-500 text-white ring-2 ring-indigo-200';
          } else {
            btnClass += 'bg-gray-50 text-gray-600 hover:bg-gray-100';
          }
          return (
            <button key={d.date} disabled={off} onClick={function () { handleDaySelect(d); }} className={btnClass}>
              <span className="block">{d.label}</span>
              <span className="block font-semibold">{d.date}</span>
            </button>
          );
        })}
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800 mb-2.5">Session Duration</p>
        <div className="grid grid-cols-4 gap-2">
          {SESSION_DURATIONS.map(function (d) {
            const durationPrice = calculatePrice(doctor, d);
            const active = duration === d;
            let btnClass = 'text-xs py-2.5 rounded-xl font-medium transition-colors flex flex-col items-center ';
            if (active) {
              btnClass += 'bg-emerald-50 text-emerald-600 border border-emerald-300';
            } else {
              btnClass += 'bg-gray-50 text-gray-600 hover:bg-gray-100';
            }
            return (
              <button key={d} onClick={function () { setDuration(d); }} className={btnClass}>
                <span>{d} min</span>
                <span className="text-[10px] opacity-75">{durationPrice.formatted}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800 mb-2.5">Session Time</p>

        {loading && <p className="text-xs text-gray-400">Loading slots...</p>}

        {!loading && isDayOff && (
          <p className="text-xs text-gray-400 italic">Doctor is off on this day. Please choose another day.</p>
        )}

        {!loading && !isDayOff && daySlots.length === 0 && (
          <p className="text-xs text-gray-400 italic">No slots available.</p>
        )}

        {!loading && !isDayOff && daySlots.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {daySlots.map(function (slot) {
              const active = time === slot;
              let btnClass = 'text-[11px] py-2.5 rounded-xl font-medium transition-colors ';
              if (active) {
                btnClass += 'bg-emerald-50 text-emerald-600 border border-emerald-300';
              } else {
                btnClass += 'bg-gray-50 text-gray-600 hover:bg-gray-100';
              }
              return (
                <button key={slot} onClick={function () { setTime(slot); }} className={btnClass}>
                  {slot}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button onClick={handleContinue} className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors">
          Accept and Continue
        </button>
        <button onClick={onRetakeSurvey} className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
          Retake Survey
        </button>
        <button onClick={onChooseAnotherDoctor} className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
          Choose another doctor
        </button>
      </div>
    </div>
  );
};

export default ScheduleSelector;
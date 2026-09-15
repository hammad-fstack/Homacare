import { useState, useEffect } from 'react';
import { X, Calendar, Plus } from 'lucide-react';
import { BACKEND_URL } from '../../config/backendApi';
import Toast from '../common/Toast';
import FieldTooltipError from '../common/FieldTooltipError';

const ALL_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ScheduleSettingsModal = ({ onClose }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [hoursByDay, setHoursByDay] = useState({});
  const [maxBookings, setMaxBookings] = useState(20);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState('');
  const [fromError, setFromError] = useState('');
  const [toError, setToError] = useState('');
  const [timeError, setTimeError] = useState('');

  useEffect(() => {
    const loadExisting = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/doctors/my-schedule`, { credentials: 'include' });
        const data = await res.json();
        const rows = data.schedule || [];

        const days = rows.filter((r) => !r.is_off_day).map((r) => r.day_of_week);
        const hours = {};
        rows.forEach((r) => {
          if (!r.is_off_day) {
            hours[r.day_of_week] = {
              start: r.start_time?.slice(0, 5) || '09:00',
              end: r.end_time?.slice(0, 5) || '17:00',
            };
          }
        });

        setSelectedDays(days);
        setHoursByDay(hours);
        setActiveTab(days[0] || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadExisting();
  }, []);

  const toggleDay = (day) => {
    setSelectedDays((prev) => {
      const next = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];
      if (!prev.includes(day)) {
        setHoursByDay((h) => ({ ...h, [day]: h[day] || { start: '09:00', end: '17:00' } }));
        setActiveTab(day);
      } else if (activeTab === day) {
        setActiveTab(next[0] || null);
      }
      return next;
    });
  };

  const updateHours = (day, field, value) => {
    setHoursByDay((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  const handleSave = async () => {
    setFromError('');
    setToError('');
    setTimeError('');

    if (fromDate < today) {
      setFromError(`Value must be ${new Date(today).toLocaleDateString('en-US')} or later.`);
      return;
    }
    if (!toDate) {
      setToError('Please select an end date.');
      return;
    }
    if (toDate <= fromDate) {
      setToError('End date must be after start date.');
      return;
    }

    for (const day of selectedDays) {
      const hours = hoursByDay[day];
      if (hours && hours.start >= hours.end) {
        setActiveTab(day);
        setTimeError('Start time must be before end time.');
        return;
      }
    }

    setSaving(true);
    try {
      const schedule = ALL_DAYS.map((day) => {
        const isOff = !selectedDays.includes(day);
        return {
          day_of_week: day,
          is_off_day: isOff,
          start_time: isOff ? null : hoursByDay[day]?.start,
          end_time: isOff ? null : hoursByDay[day]?.end,
        };
      });

      const res = await fetch(`${BACKEND_URL}/doctors/my-schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ schedule }),
      });

      if (!res.ok) throw new Error('Failed to save schedule');
      setShowToast(true);
      setTimeout(onClose, 1200);
    } catch (err) {
      console.error(err);
      alert('Could not save schedule, please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {showToast && (
        <Toast message="Schedule saved successfully" onClose={() => setShowToast(false)} />
      )}
      <div className="fixed inset-0 z-50 flex items-center justify-end p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-white w-full max-w-xl max-h-[calc(100vh-2rem)] rounded-2xl shadow-xl overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Schedule Settings</h2>
            <button onClick={onClose}><X className="w-5 h-5 text-gray-500" /></button>
          </div>

          {loading ? (
            <p className="text-sm text-gray-400">Loading current schedule...</p>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Calendar className="w-4 h-4 text-emerald-500" /> Set Availability Period
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="text-xs font-medium text-gray-600">From</label>
                    <input
                      type="date"
                      value={fromDate}
                      min={today}
                      onChange={(e) => { setFromDate(e.target.value); setFromError(''); }}
                      className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-400"
                    />
                    <FieldTooltipError message={fromError} />
                  </div>
                  <div className="relative">
                    <label className="text-xs font-medium text-gray-600">To</label>
                    <input
                      type="date"
                      value={toDate}
                      min={fromDate}
                      onChange={(e) => { setToDate(e.target.value); setToError(''); }}
                      className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-400"
                    />
                    <FieldTooltipError message={toError} />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900 mb-3">Select the days you're available for consultations</p>
                <div className="grid grid-cols-7 gap-2">
                  {ALL_DAYS.map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`text-xs font-semibold py-2 rounded-xl ${
                        selectedDays.includes(day) ? 'bg-emerald-500 text-white' : 'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDays.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                  <div className="flex gap-4 border-b border-gray-200 pb-2">
                    {selectedDays.map((day) => (
                      <button
                        key={day}
                        onClick={() => { setActiveTab(day); setTimeError(''); }}
                        className={`text-sm font-semibold pb-1 ${
                          activeTab === day ? 'text-emerald-600 border-b-2 border-emerald-500' : 'text-gray-400'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>

                  {activeTab && (
                    <>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-bold text-gray-900">Define Working Hours</p>
                        <button className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <Plus className="w-3.5 h-3.5" /> Add Time Slot
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <label className="text-xs font-medium text-gray-600">Start time</label>
                          <input
                            type="time"
                            value={hoursByDay[activeTab]?.start || '09:00'}
                            onChange={(e) => { updateHours(activeTab, 'start', e.target.value); setTimeError(''); }}
                            className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-400"
                          />
                          <FieldTooltipError message={timeError} />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600">End time</label>
                          <input
                            type="time"
                            value={hoursByDay[activeTab]?.end || '17:00'}
                            onChange={(e) => { updateHours(activeTab, 'end', e.target.value); setTimeError(''); }}
                            className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-400"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div>
                <p className="text-sm font-bold text-gray-900 mb-2">Set Maximum Bookings Per Day</p>
                <select
                  value={maxBookings}
                  onChange={(e) => setMaxBookings(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-400"
                >
                  {[5, 10, 15, 20, 25, 30].map((n) => (
                    <option key={n} value={n}>{n} bookings</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className="text-sm font-bold text-gray-900">Freeze My Schedule</p>
                <label className="relative inline-flex items-center cursor-not-allowed opacity-50">
                  <input type="checkbox" disabled className="sr-only peer" />
                  <div className="w-10 h-6 bg-gray-200 rounded-full" />
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={onClose} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-3 rounded-xl">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-3 rounded-xl disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ScheduleSettingsModal;
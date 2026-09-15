import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, Settings, Filter, Calendar, Globe, Bell } from 'lucide-react';
import { useDoctorAppointments } from '../../hooks/useDoctorAppointments';
import ScheduleSettingsModal from '../../components/doctor/ScheduleSettingsModal';
import { isJoinable } from '../../utils/consultationTiming';

const DAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const STATUS_STYLES = {
  scheduled: 'text-emerald-600',
  completed: 'text-gray-500',
  cancelled: 'text-red-500',
};

const STATUS_LABELS = {
  scheduled: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const getDurationLabel = (appt) => {
  if (appt.duration_minutes) return `${appt.duration_minutes} min`;
  const [sh, sm] = appt.start_time.split(':').map(Number);
  const [eh, em] = appt.end_time.split(':').map(Number);
  const diff = (eh * 60 + em) - (sh * 60 + sm);
  return diff > 0 ? `${diff} min` : '—';
};

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const { appointments, loading } = useDoctorAppointments();
  const [monthOffset, setMonthOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const viewDate = new Date();
  viewDate.setMonth(viewDate.getMonth() + monthOffset);
  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const filtered = appointments.filter((a) => {
    const apptDate = new Date(a.appointment_date);
    const sameMonth = apptDate.getMonth() === viewDate.getMonth() && apptDate.getFullYear() === viewDate.getFullYear();
    const matchesSearch = a.patient_name?.toLowerCase().includes(search.toLowerCase());
    return sameMonth && (search === '' || matchesSearch);
  });

  const notificationCount = appointments.filter((a) => a.status === 'scheduled').length;

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white border border-gray-100 rounded-2xl shadow-sm px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Appointment</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input type="text" placeholder="Search"
              className="bg-gray-100 text-gray-600 text-xs rounded-lg pl-3 pr-8 py-2 w-48 outline-none placeholder-gray-400" />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <Globe className="w-4 h-4 text-gray-600" />
          </button>
          <button className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <Bell className="w-4 h-4 text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Single card: month-nav bar + table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-3 p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <button onClick={() => setMonthOffset((m) => m - 1)} className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center">
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <span className="text-sm font-semibold text-gray-800 bg-gray-50 px-4 py-2 rounded-full flex items-center gap-2">
              {monthLabel} <Calendar className="w-3.5 h-3.5 text-gray-400" />
            </span>
            <button onClick={() => setMonthOffset((m) => m + 1)} className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="text-sm border border-gray-200 rounded-lg pl-3 pr-9 py-2 outline-none w-48"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <button className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
            <button className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={() => setScheduleOpen(true)}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-medium px-4 py-2 rounded-lg"
            >
              Schedule <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="py-3 px-5 font-medium">Patient</th>
                <th className="py-3 px-5 font-medium">Day</th>
                <th className="py-3 px-5 font-medium">Date</th>
                <th className="py-3 px-5 font-medium">Time</th>
                <th className="py-3 px-5 font-medium">Duration</th>
                <th className="py-3 px-5 font-medium">Service</th>
                <th className="py-3 px-5 font-medium">Status</th>
                <th className="py-3 px-5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((appt) => {
                const apptDate = new Date(appt.appointment_date);
                return (
                  <tr key={appt.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 px-5 font-medium text-gray-800">{appt.patient_name}</td>
                    <td className="py-4 px-5 text-gray-600">{DAY_LABELS[apptDate.getDay()]}</td>
                    <td className="py-4 px-5 text-gray-600">{apptDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                    <td className="py-4 px-5 text-gray-600">{appt.start_time} - {appt.end_time}</td>
                    <td className="py-4 px-5 text-gray-600">{getDurationLabel(appt)}</td>
                    <td className="py-4 px-5 text-gray-600">Consultation</td>
                    <td className={`py-4 px-5 font-semibold ${STATUS_STYLES[appt.status]}`}>{STATUS_LABELS[appt.status]}</td>
                    <td className="py-4 px-5">
                      {appt.status === 'scheduled' && isJoinable(appt) ? (
                        <button
                          onClick={() =>navigate('/doctor/consultation-hub')}
                          className="text-emerald-600 font-medium"
                        >
                          Join &gt;
                        </button>
                      ) : appt.status === 'scheduled' ? (
                        <span className="text-gray-300 text-xs">Not yet</span>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-xs text-gray-400 py-16 text-center">No appointments this month</p>
        )}
      </div>

      {scheduleOpen && <ScheduleSettingsModal onClose={() => setScheduleOpen(false)} />}
    </div>
  );
};

export default DoctorAppointments;
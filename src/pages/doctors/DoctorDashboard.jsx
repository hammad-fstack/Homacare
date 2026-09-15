import { useDoctorDashboard } from '../../hooks/useDoctorDashboard';
import { DOCTOR_METRIC_CARDS } from '../../config/doctorDashboardConfig';
import MetricCard from '../../components/common/MetricCard';
import CalendarWidget from '../../components/dashboard/CalendarWidget';
import { ChevronRight } from 'lucide-react';

const DoctorDashboard = () => {
  const { loading, metrics, upcomingAppointments } = useDoctorDashboard();

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DOCTOR_METRIC_CARDS.map((card) => (
              <MetricCard
                key={card.key}
                label={card.label}
                subtitle={card.subtitle}
                highlight={false}
                value={metrics[card.key]}
              />
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 text-base">Upcoming Appointments</h3>
              <button className="text-xs text-emerald-600 font-medium">View All</button>
            </div>

            {upcomingAppointments.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    <th className="pb-2 font-medium">Patient</th>
                    <th className="pb-2 font-medium">Service</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Time</th>
                    <th className="pb-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAppointments.map((appt) => (
                    <tr key={appt.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
                          {appt.patient_name?.[0] || '?'}
                        </div>
                        {appt.patient_name}
                      </td>
                      <td className="py-3 text-gray-600">Consultation</td>
                      <td className="py-3 text-gray-600">{appt.appointment_date.split('T')[0]}</td>
                      <td className="py-3 text-gray-600">{appt.start_time}</td>
                      <td className="py-3">
                        <button className="text-emerald-600 font-medium flex items-center gap-1">
                          Join <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-xs text-gray-400 py-6 text-center">No upcoming appointments</p>
            )}
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 text-base">Recent Lab Orders</h3>
              <button className="text-xs text-emerald-600 font-medium">View All</button>
            </div>
            <p className="text-xs text-gray-400 py-6 text-center">No lab orders yet</p>
          </div>
        </div>

        <div className="space-y-6">
          <CalendarWidget />
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h4 className="font-semibold text-gray-800 text-sm mb-4">Latest Activity</h4>
            <p className="text-xs text-gray-400 text-center py-6">Nothing here yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
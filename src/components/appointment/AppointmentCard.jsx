const AppointmentCard = ({ appointment }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
    <img src={appointment.doctorAvatar} alt={appointment.doctorName} className="w-12 h-12 rounded-full object-cover" />
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-900">{appointment.doctorName}</p>
      <p className="text-xs text-gray-400">{appointment.title} · {appointment.time}</p>
    </div>
    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full capitalize">
      {appointment.status}
    </span>
  </div>
);

export default AppointmentCard;
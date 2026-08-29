const STATUS_STYLES = {
  Upcoming: 'bg-emerald-50 text-emerald-600',
  Completed: 'bg-gray-100 text-gray-500',
  Cancelled: 'bg-red-50 text-red-500',
};

const ConsultationCard = ({ consultation, showJoinButton, showViewDetails }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-4">
    <div className="flex items-center gap-3">
      <img
        src={consultation.avatar}
        alt={consultation.doctorName}
        className="w-11 h-11 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500">{consultation.doctorName}</p>
        <p className="text-sm font-semibold text-emerald-600 truncate">{consultation.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-gray-400">{consultation.time}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[consultation.status]}`}>
            {consultation.status}
          </span>
        </div>
      </div>
      {showViewDetails && (
        <button className="text-emerald-600 text-xs font-medium hover:underline whitespace-nowrap">
          View Details ›
        </button>
      )}
    </div>

    {showJoinButton && (
      <button className="mt-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium px-4 py-1.5 rounded-lg">
        Join Now
      </button>
    )}
  </div>
);

export default ConsultationCard;
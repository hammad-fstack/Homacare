const EmptyState = ({ icon, message, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
    <div className="text-5xl">
      {icon}
    </div>
    <p className="text-lg font-semibold text-gray-800">{message}</p>
    {actionLabel && (
      <button
        onClick={onAction}
        className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-xl"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
const EmptyState = ({ icon, message, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl">
      {icon}
    </div>
    <p className="text-sm text-gray-500 font-medium">{message}</p>
    {actionLabel && (
      <button
        onClick={onAction}
        className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
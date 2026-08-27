const MetricCard = ({ label, value, subtitle, highlight }) => (
  <div className={`p-5 rounded-2xl flex flex-col justify-between h-32 shadow-sm ${
    highlight ? 'bg-emerald-400 text-white' : 'bg-white border border-gray-100'
  }`}>
    <span className={`text-sm font-medium ${highlight ? 'opacity-90' : 'text-gray-600'}`}>{label}</span>
    <div className="flex justify-between items-end">
      <span className={`text-3xl font-bold ${!highlight ? 'text-gray-900' : ''}`}>{value}</span>
      <span className={`text-xs ${highlight ? 'opacity-80' : 'text-gray-400'}`}>{subtitle}</span>
    </div>
  </div>
);

export default MetricCard;
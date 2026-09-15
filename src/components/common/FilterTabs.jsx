const FilterTabs = ({ tabs, activeTab, onChange }) => (
  <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        onClick={() => onChange(tab.value)}
        className={`text-xs px-4 py-1.5 rounded-lg font-medium transition-colors ${
          activeTab === tab.value
            ? 'bg-white text-emerald-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default FilterTabs;
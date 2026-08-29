import { Search, Bell } from 'lucide-react';

const PageHeader = ({ title }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
    <div className="flex items-center gap-3">
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search"
          className="text-sm border border-gray-200 rounded-lg pl-9 pr-3 py-2 outline-none w-48"
        />
      </div>
      <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
        <Bell className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  </div>
);

export default PageHeader;
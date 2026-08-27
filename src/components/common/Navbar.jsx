import { Search, Bell } from 'lucide-react';

const Navbar = () => (
  <div className="h-12 bg-gray-900 flex items-center justify-between px-6">
    <span className="text-gray-300 text-sm">dashboard</span>
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 text-gray-300 text-xs rounded-lg pl-3 pr-8 py-1.5 w-40 outline-none placeholder-gray-500"
        />
        <Search className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2" />
      </div>
      <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
        <Bell className="w-4 h-4 text-gray-300" />
      </button>
    </div>
  </div>
);

export default Navbar;
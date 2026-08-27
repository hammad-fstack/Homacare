import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <div className="h-screen flex bg-white">
    <Sidebar />
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      {children}
    </div>
  </div>
);

export default Layout;
import DoctorSidebar from './DoctorSidebar';

const DoctorLayout = ({ children }) => (
  <div className="h-screen flex bg-gray-50">
    <DoctorSidebar />
    <div className="flex-1 overflow-y-auto p-6">
      {children}
    </div>
  </div>
);

export default DoctorLayout;
// Reusable field renderer — DRY principle, har field ke liye alag JSX nahi likhna
const ProfileField = ({ label, value }) => (
  <div className="py-3 border-b border-gray-100 last:border-0">
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-sm font-medium text-gray-800 mt-0.5">{value}</p>
  </div>
);

export default ProfileField;
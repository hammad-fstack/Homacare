import { useProfile } from '../hooks/useProfile';
import ProfileField from '../components/profile/ProfileField';

// Config-driven rendering — Factory-style: fields array se map hota hai
const PROFILE_FIELDS = [
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'joined', label: 'Member Since' },
];

const Profile = () => {
  const { profile, loading } = useProfile();

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-md">
        <div className="flex items-center gap-4 mb-4">
          <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h2 className="text-lg font-bold text-gray-900">{profile.name}</h2>
            <p className="text-xs text-gray-400">Patient</p>
          </div>
        </div>

        <div>
          {PROFILE_FIELDS.map((field) => (
            <ProfileField key={field.key} label={field.label} value={profile[field.key]} />
          ))}
        </div>

        <button className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
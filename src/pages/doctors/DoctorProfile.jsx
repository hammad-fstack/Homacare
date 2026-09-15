import { useState, useEffect } from 'react';
import { Search, Bell, Globe, Pencil } from 'lucide-react';
import { useDoctorProfile } from '../../hooks/useDoctorProfile';
import Toast from '../../components/common/Toast';

const DoctorProfile = () => {
  const { profile, loading, saving, updateProfile } = useDoctorProfile();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
    const ok = await updateProfile({
      name: form.name,
      specialty: form.specialty,
      experience: form.experience,
      bio: form.bio,
      consultation_fee: form.consultation_fee,
    });
    if (ok) {
      setEditing(false);
      setShowToast(true);
    }
  };

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;
  if (!profile) return <div className="p-6 text-sm text-gray-400">Profile not found</div>;

  return (
    <div className="space-y-6">
      {showToast && <Toast message="Profile updated successfully" onClose={() => setShowToast(false)} />}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input placeholder="Search" className="bg-gray-100 text-gray-600 text-xs rounded-lg pl-3 pr-8 py-2 w-48 outline-none" />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"><Globe className="w-4 h-4 text-gray-600" /></button>
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"><Bell className="w-4 h-4 text-gray-600" /></button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-500">
              {profile.name?.[0] || 'D'}
            </div>
          )}
          <div>
            <h2 className="text-lg font-bold text-gray-900">{profile.name}</h2>
            <p className="text-xs text-gray-400">{profile.email}</p>
          </div>
          {!editing && (
            <button onClick={() => setEditing(true)} className="ml-auto flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
              <Pencil className="w-3.5 h-3.5" /> Edit
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600">Full Name</label>
            {editing ? (
              <input value={form.name || ''} onChange={update('name')} className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none" />
            ) : (
              <p className="text-sm text-gray-800 mt-1">{profile.name}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Specialty</label>
            {editing ? (
              <input value={form.specialty || ''} onChange={update('specialty')} className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none" />
            ) : (
              <p className="text-sm text-gray-800 mt-1">{profile.specialty}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Experience</label>
            {editing ? (
              <input value={form.experience || ''} onChange={update('experience')} className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none" />
            ) : (
              <p className="text-sm text-gray-800 mt-1">{profile.experience}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Bio</label>
            {editing ? (
              <textarea value={form.bio || ''} onChange={update('bio')} rows={3} className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none" />
            ) : (
              <p className="text-sm text-gray-800 mt-1">{profile.bio}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Consultation Fee ({profile.currency_symbol})</label>
            {editing ? (
              <input type="number" value={form.consultation_fee || ''} onChange={update('consultation_fee')} className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none" />
            ) : (
              <p className="text-sm text-gray-800 mt-1">{profile.currency_symbol} {profile.consultation_fee}</p>
            )}
          </div>
        </div>

        {editing && (
          <div className="flex gap-3 mt-6">
            <button onClick={() => { setEditing(false); setForm(profile); }} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2.5 rounded-lg disabled:opacity-60">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
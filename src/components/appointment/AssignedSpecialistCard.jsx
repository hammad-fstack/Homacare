import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { getDoctorAvatar } from '../../utils/doctorAvatarFallback';

const AssignedSpecialistCard = ({ doctor }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div className="w-full space-y-3">
      <div className="rounded-2xl overflow-hidden relative aspect-[4/5]">
        <img
          src={getDoctorAvatar(doctor)}
          alt={doctor.name}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-semibold text-sm">{doctor.name}</p>
          <p className="text-white/80 text-xs mb-3">{doctor.specialty}</p>
          <button
            onClick={() => navigate(`/book-appointment/${doctor.id}`)}
            className="w-full bg-white/90 hover:bg-white text-gray-900 text-xs font-medium py-2.5 rounded-full flex items-center justify-center gap-1"
          >
            Connect with Specialist &gt;
          </button>
        </div>
      </div>

      <div className="relative">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a doctor"
          className="w-full bg-white border border-gray-200 rounded-full pl-4 pr-10 py-3 text-xs outline-none"
        />
        <Search className="w-3.5 h-3.5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};

export default AssignedSpecialistCard;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Trash2 } from 'lucide-react';
import { DRAFTS, UPCOMING, PREVIOUS } from '../config/appointmentsConfig';

const Consultations = () => {
  const navigate = useNavigate();
  const [upcoming, setUpcoming] = useState(UPCOMING);
  const [cancelId, setCancelId] = useState(null);

  const handleCancel = (id) => {
    setUpcoming((prev) => prev.filter((u) => u.id !== id));
    setCancelId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-xs text-gray-400">View and manage your appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input placeholder="Search by doctor name or..." className="bg-gray-50 text-xs rounded-lg pl-3 pr-8 py-2 w-56 outline-none" />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <button onClick={() => navigate('/doctor-portal')} className="text-emerald-600 text-sm font-medium flex items-center gap-1">
            New Consultation <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {DRAFTS.length > 0 && (
        <div>
          <h2 className="font-bold text-gray-900 mb-3">Drafts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DRAFTS.map((d) => (
              <div key={d.id} className="bg-gray-50 rounded-xl p-4 space-y-3 relative">
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">DRAFT</span>
                <button className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <img src={d.avatar} alt={d.doctor} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-xs text-gray-500">{d.doctor}</p>
                    <h4 className="text-sm font-semibold text-emerald-600">{d.title}</h4>
                    <p className="text-[10px] text-gray-400">{d.date}</p>
                  </div>
                </div>
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium py-2 rounded-lg">
                  Resume
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-bold text-gray-900 mb-3">Upcoming</h2>
        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcoming.map((u) => (
              <div key={u.id} className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <img src={u.avatar} alt={u.doctor} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-xs text-gray-500">{u.doctor}</p>
                    <h4 className="text-sm font-semibold text-emerald-600">{u.title}</h4>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">In {u.inHours} hours</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Upcoming</span>
                  <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{u.dateTime}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium py-2 rounded-lg">Join</button>
                  {cancelId === u.id ? (
                    <button onClick={() => handleCancel(u.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-2 rounded-lg">
                      Confirm Cancel
                    </button>
                  ) : (
                    <button onClick={() => setCancelId(u.id)} className="flex-1 bg-white border border-red-200 hover:bg-red-50 text-red-500 text-xs font-medium py-2 rounded-lg">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">No upcoming consultations</p>
        )}
      </div>

      <div>
        <h2 className="font-bold text-gray-900 mb-3">Previous Consultation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PREVIOUS.map((p) => (
            <div key={p.id} className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-3">
                <img src={p.avatar} alt={p.patient} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-xs text-gray-500">{p.patient}</p>
                  <h4 className="text-sm font-semibold text-emerald-600">{p.title}</h4>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{p.daysAgo} days ago</span>
                <span className="text-[10px] bg-gray-700 text-white px-2 py-0.5 rounded-full">Completed</span>
                <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{p.dateTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Consultations;
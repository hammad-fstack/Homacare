import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useConsultations } from '../hooks/useConsultations';
import ConsultationCard from '../components/consultations/ConsultationCard';
import PageHeader from '../components/common/PageHeader';

const Consultations = () => {
  const { data, loading } = useConsultations();
  const navigate = useNavigate();

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Appointment" />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Take charge of your wellness</h2>
            <p className="text-xs text-gray-400 mt-1">
              Stay informed about your consultations, lab tests, and treatments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for a doctor"
                className="text-sm border border-gray-200 rounded-lg pl-9 pr-3 py-2 outline-none w-52"
              />
            </div>
            <button
              onClick={() => navigate('/appointments')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> New consultation
            </button>
          </div>
        </div>

        {data.ongoing.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-800">Ongoing</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.ongoing.map((c) => (
                <ConsultationCard key={c.id} consultation={c} showJoinButton />
              ))}
            </div>
          </div>
        )}

        {data.upcoming.map((c) => (
          <div key={c.id} className="space-y-3">
            <p className="text-sm font-semibold text-gray-800">Upcoming {c.date}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ConsultationCard consultation={c} />
            </div>
          </div>
        ))}

        {data.previous.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-800">Previous Consultation</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.previous.map((c) => (
                <ConsultationCard key={c.id} consultation={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consultations;
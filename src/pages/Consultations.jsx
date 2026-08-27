import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useConsultations } from '../hooks/useConsultations';
import FilterTabs from '../components/common/FilterTabs';
import ConsultationCard from '../components/consultations/ConsultationCard';
import EmptyState from '../components/common/EmptyState';

const FILTER_TABS = [
  { label: 'All', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

const Consultations = () => {
  const { consultations, loading, filter, setFilter } = useConsultations();
  const navigate = useNavigate();

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Consultations</h1>
        <button
          onClick={() => navigate('/appointments')}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> New Appointment
        </button>
      </div>

      <FilterTabs tabs={FILTER_TABS} activeTab={filter} onChange={setFilter} />

      <div className="space-y-3">
        {consultations.length > 0 ? (
          consultations.map((c) => <ConsultationCard key={c.id} consultation={c} />)
        ) : (
          <EmptyState icon="📅" message="No consultations found" />
        )}
      </div>
    </div>
  );
};

export default Consultations;
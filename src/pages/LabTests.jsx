import PageHeader from '../components/common/PageHeader';
import { ChevronRight } from 'lucide-react';
import { useLabTests } from '../hooks/useLabTests';
import EmptyState from '../components/common/EmptyState';

const LabTests = () => {
  const { labTests, loading } = useLabTests();

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Lab Tests" />
      <h1 className="text-2xl font-bold text-gray-900">Lab Tests</h1>

      <div className="space-y-3">
        {labTests.length > 0 ? (
          labTests.map((test) => (
            <div key={test.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs">🧪</div>
                <div>
                  <p className="text-xs text-gray-400">Ordered by {test.doctor}</p>
                  <h4 className="text-sm font-semibold text-emerald-600">{test.title}</h4>
                  <span className="text-[10px] text-gray-400">{test.time}</span>
                </div>
              </div>
              {test.status === 'pay' ? (
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
                  Pay now <ChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
                  View result <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ))
        ) : (
          <EmptyState icon="🪴" message="No lab tests found" />
        )}
      </div>
    </div>
  );
};

export default LabTests;
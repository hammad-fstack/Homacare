import { ChevronRight } from 'lucide-react';
import EmptyState from '../common/EmptyState';

const LabTestsSection = ({ tests, emptyConfig }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 min-h-[200px]">
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-gray-900 text-base">Lab Tests</h3>
      <button className="text-xs text-gray-400 hover:text-gray-600">View All</button>
    </div>

    {tests && tests.length > 0 ? (
      <div className="space-y-3">
        {tests.map((test) => (
          <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs">🧪</div>
              <div>
                <p className="text-xs text-gray-400">Ordered by {test.doctor}</p>
                <h4 className="text-sm font-semibold text-emerald-600">{test.title}</h4>
                <span className="text-[10px] text-gray-400">{test.time}</span>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
              Pay now <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    ) : (
      <EmptyState {...emptyConfig} />
    )}
  </div>
);

export default LabTestsSection;
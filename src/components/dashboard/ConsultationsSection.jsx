import { ChevronRight } from 'lucide-react';
import EmptyState from '../common/EmptyState';

const ConsultationsSection = ({ consultation, emptyConfig }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 min-h-[160px]">
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-gray-900 text-base">Upcoming Consultations</h3>
      <button className="text-xs text-emerald-600 font-medium">+ New Consultation</button>
    </div>

    {consultation ? (
      <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
        <div className="flex items-center gap-3">
          <img src={consultation.avatar} alt="Doctor" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="text-xs text-gray-400">{consultation.doctor}</p>
            <h4 className="text-sm font-semibold text-emerald-600">{consultation.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{consultation.date}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{consultation.status}</span>
            </div>
          </div>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
          View Details <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    ) : (
      <EmptyState {...emptyConfig} />
    )}
  </div>
);

export default ConsultationsSection;
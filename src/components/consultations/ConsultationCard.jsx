import { ChevronRight } from 'lucide-react';
import { STATUS_STYLES } from '../../config/consultationsConfig';

const ConsultationCard = ({ consultation }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
    <div className="flex items-center gap-3">
      <img src={consultation.avatar} alt={consultation.doctor} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <p className="text-xs text-gray-400">{consultation.doctor}</p>
        <h4 className="text-sm font-semibold text-gray-800">{consultation.title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{consultation.date}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[consultation.status]}`}>
            {consultation.status}
          </span>
        </div>
      </div>
    </div>
    <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
      View Details <ChevronRight className="w-3 h-3" />
    </button>
  </div>
);

export default ConsultationCard;
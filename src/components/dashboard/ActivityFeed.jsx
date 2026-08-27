import { Calendar, MessageCircle, FlaskConical, Wrench, Mail } from 'lucide-react';
import EmptyState from '../common/EmptyState';

const ICONS = {
  appointment: Calendar,
  consultation: MessageCircle,
  lab: FlaskConical,
  maintenance: Wrench,
  message: Mail,
};

const ActivityFeed = ({ items, emptyConfig }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 min-h-[200px]">
    <h4 className="font-semibold text-gray-800 text-sm">Latest Activity</h4>
    {items && items.length > 0 ? (
      <div className="space-y-4">
        {items.map((item, i) => {
          const Icon = ICONS[item.type] || Calendar;
          return (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">{item.date}</span>
                <p className="text-xs font-semibold text-gray-800">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <EmptyState {...emptyConfig} />
    )}
  </div>
);

export default ActivityFeed;
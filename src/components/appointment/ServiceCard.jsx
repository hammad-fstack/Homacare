import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDoctorAvatar } from '../../utils/doctorAvatarFallback';

const ServiceCard = ({ service, isActive, onHoverStart, onHoverEnd }) => {
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={() => navigate(`/service/${service.slug}`)}
      className="relative rounded-2xl overflow-hidden cursor-pointer bg-white h-80 w-[384px]"
    >
      {isActive && (
        <>
          <img
            src={getDoctorAvatar(service.doctor)}
            alt={service.doctor.name}
            className="w-[384px] h-[352px] object-cover absolute inset-0"
            style={{ objectPosition: 'center 20%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        </>
      )}

      <div className="relative h-full flex flex-col p-4">
        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-sm">
          {service.icon}
        </div>

        <div className="mt-auto">
          {isActive && (
            <p className="text-white text-xs mb-2 line-clamp-2">
              {service.doctor.name} — {service.doctor.bio?.slice(0, 60)}...
            </p>
          )}
          <div className="mt-auto flex items-center justify-between gap-2">
            <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-800'}`}>
              {service.title}
            </span>
            {isActive ? (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/service/${service.slug}`); }}
                className="text-xs bg-white/90 hover:bg-white text-gray-900 px-3 py-1.5 rounded-full font-medium flex items-center gap-1 flex-shrink-0"
              >
                Check Now &gt;
              </button>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/service/${service.slug}`); }}
                className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  // Featured card hamesha content-open dikhta hai (default state), baaki sirf hover pe
  const showContent = service.featured || hovered;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/service/${service.slug}`)}
      className="relative rounded-2xl overflow-hidden cursor-pointer bg-white h-64 w-full"
    >
      {showContent && (
        <>
          <img src={service.doctor.avatar} alt={service.doctor.name} className="w-full h-full object-cover absolute inset-0" style={{ objectPosition: 'center 20%' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        </>
      )}

      <div className="relative h-full flex flex-col p-4">
        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-sm">
          {service.icon}
        </div>

        <div className="mt-auto">
          {showContent && (
            <p className="text-white text-xs mb-2 line-clamp-2">
              {service.doctor.name} — {service.doctor.bio?.slice(0, 60)}...
            </p>
          )}
          <div className="flex items-center justify-between gap-2">
            <span className={`text-sm font-medium ${showContent ? 'text-white' : 'text-gray-800'}`}>
              {service.title}
            </span>
            {service.featured ? (
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
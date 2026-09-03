import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useServicesWithDoctors } from '../hooks/useServicesWithDoctors';
import { useDoctorContext } from '../context/DoctorContext';
import { useParams } from 'react-router-dom';

const ServiceDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { services, loading } = useServicesWithDoctors();
  const { setSelectedDoctor } = useDoctorContext();
  const [showDescription, setShowDescription] = useState(true);
  const [showIncluded, setShowIncluded] = useState(true);

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;

  const service = services.find((s) => s.slug === slug);
  if (!service) return <div className="p-6 text-sm text-gray-400">Service not found</div>;

  const { doctor } = service;

  const handleBook = () => {
    setSelectedDoctor(doctor);
    navigate('/symptom-check');
  };

  return (
    <div className="space-y-8">
      <p className="text-xs text-gray-400">Home &gt; Virtual Consultation &gt; About Service</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden relative h-96">
          <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white font-bold">{doctor.name}</h3>
            <p className="text-white/80 text-xs">{doctor.bio}</p>
          </div>
        </div>

        <div className="space-y-4">
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{service.category}</span>
          <h2 className="text-xl font-bold text-gray-900">{service.title}</h2>
          <p className="text-lg font-bold text-gray-800">SAR <span className="text-xl">{service.price}</span></p>

          <div className="border border-gray-100 rounded-xl">
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="w-full flex justify-between items-center px-4 py-3 font-semibold text-sm text-gray-800"
            >
              Description &amp; Details
              {showDescription ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showDescription && (
              <p className="px-4 pb-3 text-xs text-gray-500">{service.description}</p>
            )}
          </div>

          <button
            onClick={handleBook}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-3 rounded-lg"
          >
            Book a Consultation
          </button>

          <div className="border border-gray-100 rounded-xl">
            <button
              onClick={() => setShowIncluded(!showIncluded)}
              className="w-full flex justify-between items-center px-4 py-3 font-semibold text-sm text-gray-800"
            >
              What's Included
              {showIncluded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showIncluded && (
              <p className="px-4 pb-3 text-xs text-gray-500">{service.included}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
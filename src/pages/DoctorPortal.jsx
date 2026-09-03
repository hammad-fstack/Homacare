import { useServicesWithDoctors } from '../hooks/useServicesWithDoctors';
import ServiceCard from '../components/appointment/ServiceCard';
import AssignedSpecialistCard from '../components/appointment/AssignedSpecialistCard';

const DoctorPortal = () => {
    const { services, loading, error } = useServicesWithDoctors();

    if (loading) return <div className="p-6 text-sm text-gray-400">Loading services...</div>;
    if (error) return <div className="p-6 text-sm text-red-500">Could not load services: {error}</div>;
    if (!services.length) return <div className="p-6 text-sm text-gray-400">No services available</div>;

    const defaultDoctor = services[0].doctor;

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                <div>
                    <p className="text-xs text-gray-400 mb-3">Home &gt; Virtual Consultations</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        Take the next step with a trusted fertility advisor.
                    </h1>
                    <p className="text-sm text-gray-500 mt-3 max-w-md">
                        From fertility to everyday wellness, explore personalized care with trusted specialists.
                    </p>
                </div>

                <div>
                    <AssignedSpecialistCard doctor={defaultDoctor} />
                </div>
            </div>

            <div>
                <h2 className="font-bold text-gray-900 mb-4">Available Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {services.map((s) => (
                        <ServiceCard key={s.id} service={s} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorPortal;
import { useNavigate } from 'react-router-dom';
import { useDoctors } from '../hooks/useDoctors';
import { useDoctorSelection } from '../hooks/useDoctorSelection';
import { useDoctorContext } from '../context/DoctorContext';
import AssignedSpecialist from '../components/appointment/AssignedSpecialist';
import DoctorGridCard from '../components/appointment/DoctorGridCard';
import PageHeader from '../components/common/PageHeader';

const DoctorSelection = () => {
  const navigate = useNavigate();
  const { doctors, loading, error } = useDoctors();
  const { selectedDoctorId, selectDoctor } = useDoctorSelection(null);
  const { setSelectedDoctor } = useDoctorContext();

  if (loading) return <div className="p-6 text-sm text-gray-400">Loading doctors...</div>;
  if (error) return <div className="p-6 text-sm text-red-500">Could not load doctors: {error}</div>;
  if (!doctors.length) return <div className="p-6 text-sm text-gray-400">No doctors available</div>;

  const currentId = selectedDoctorId ?? doctors[0]?.id;
  const assignedDoctor = doctors.find((d) => d.id === currentId);

  // Symptom questionnaire abhi bhi doctor ki specialty ke hisaab se sahi sawal chunta hai
  const handleProceed = () => {
    setSelectedDoctor(assignedDoctor);
    navigate('/symptom-check');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Appointment" />

      <div>
        <h2 className="text-lg font-semibold text-gray-900">Your Assigned Specialist</h2>
        <p className="text-xs text-gray-400 mt-1">Book your consultation with ease</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssignedSpecialist doctor={assignedDoctor} />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-1">Prefer a different doctor?</h3>
          <p className="text-xs text-gray-400 mb-4">
            Browse other specialists from around the world and pick the one that best suits your preference.
          </p>

          <div className="grid grid-cols-3 gap-3">
            {doctors.map((doc) => (
              <DoctorGridCard
                key={doc.id}
                doctor={doc}
                isSelected={currentId === doc.id}
                onSelect={selectDoctor}
              />
            ))}
          </div>

          <button
            onClick={handleProceed}
            className="w-full mt-5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2.5 rounded-lg"
          >
            Continue with {assignedDoctor.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorSelection;
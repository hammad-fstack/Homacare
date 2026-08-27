import { useNavigate } from 'react-router-dom';
import { DOCTORS } from '../config/doctorsConfig';
import { useDoctorSelection } from '../hooks/useDoctorSelection';
import AssignedSpecialist from '../components/appointment/AssignedSpecialist';
import DoctorGridCard from '../components/appointment/DoctorGridCard';

const DoctorSelection = () => {
  const navigate = useNavigate();
  const { selectedDoctorId, selectDoctor } = useDoctorSelection(DOCTORS[0].id);

  const assignedDoctor = DOCTORS.find((d) => d.id === selectedDoctorId);

  const handleProceed = () => {
    navigate(`/book-appointment/${selectedDoctorId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Your Assigned Specialist</h2>
        <p className="text-xs text-gray-400 mt-1">Book your consultation with ease</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssignedSpecialist doctor={assignedDoctor} />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-1">Prefer a different doctor?</h3>
          <p className="text-xs text-gray-400 mb-4">
            Browse other specialists from the same field and pick the one that best suits your preference.
          </p>

          <div className="grid grid-cols-3 gap-3">
            {DOCTORS.map((doc) => (
              <DoctorGridCard
                key={doc.id}
                doctor={doc}
                isSelected={selectedDoctorId === doc.id}
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
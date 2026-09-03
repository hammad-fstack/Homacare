import { useNavigate } from 'react-router-dom';
import { useSymptomFlow } from '../hooks/useSymptomFlow';
import { useDoctorContext } from '../context/DoctorContext';
import SymptomStep from '../components/appointment/SymptomStep';

const SymptomQuestionnaire = () => {
  const navigate = useNavigate();
  const { selectedDoctor, setSurveyAnswers } = useDoctorContext();

  if (!selectedDoctor) {
    return (
      <div className="p-6 text-center space-y-3">
        <p className="text-sm text-gray-400">Pehle ek doctor select karein</p>
        <button onClick={() => navigate('/doctor-portal')} className="text-emerald-600 text-sm font-medium underline">
          Doctors dekhein
        </button>
      </div>
    );
  }

  const handleComplete = (answers) => {
    setSurveyAnswers(answers);
    navigate(`/book-appointment/${selectedDoctor.id}`);
  };

  const { currentStep, showResponse, selectOption, continueFlow, goBack } = useSymptomFlow(
    selectedDoctor.specialty,
    handleComplete
  );

  return (
    <div className="bg-gray-50 -m-6 p-6 min-h-full">
      <SymptomStep
        currentStep={currentStep}
        showResponse={showResponse}
        onSelect={selectOption}
        onContinue={continueFlow}
        onBack={goBack}
      />
    </div>
  );
};

export default SymptomQuestionnaire;
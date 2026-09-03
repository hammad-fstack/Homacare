import { Heart } from 'lucide-react';

const SymptomStep = ({ currentStep, showResponse, onSelect, onContinue, onBack }) => (
  <div className="min-h-[70vh] flex items-center justify-center">
    <div className="text-center max-w-sm w-full">
      {showResponse ? (
        <>
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-700 mb-6">{currentStep.response}</p>
          <button
            onClick={onContinue}
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-6 py-2.5 rounded-full"
          >
            Continue
          </button>
        </>
      ) : (
        <>
          <h2 className="text-base font-bold text-gray-900 mb-6">{currentStep.question}</h2>
          <div className="space-y-3">
            {currentStep.options.map((opt) => (
              <button
                key={opt}
                onClick={() => onSelect(opt)}
                className="w-full bg-gray-50 hover:bg-gray-100 text-emerald-700 text-sm font-medium py-3 rounded-full transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
          <button onClick={onBack} className="text-xs text-amber-600 hover:underline mt-6">
            Back
          </button>
        </>
      )}
    </div>
  </div>
);

export default SymptomStep;
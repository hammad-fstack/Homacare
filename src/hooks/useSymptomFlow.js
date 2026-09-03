import { useState } from 'react';
import { getSymptomFlowForSpecialty } from '../config/symptomConfig';

export const useSymptomFlow = (specialty, onComplete) => {
  const flow = getSymptomFlowForSpecialty(specialty);

  const [stepIndex, setStepIndex] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [answers, setAnswers] = useState({});

  const currentStep = flow[stepIndex];
  const isLastStep = stepIndex === flow.length - 1;

  const selectOption = (option) => {
    setAnswers((prev) => ({ ...prev, [currentStep.id]: option }));
    setShowResponse(true);
  };

  const continueFlow = () => {
    if (isLastStep) {
      onComplete(answers);
      return;
    }
    setStepIndex((prev) => prev + 1);
    setShowResponse(false);
  };

  const goBack = () => {
    if (stepIndex === 0) return;
    setStepIndex((prev) => prev - 1);
    setShowResponse(false);
  };

  return { currentStep, showResponse, selectOption, continueFlow, goBack, stepIndex };
};
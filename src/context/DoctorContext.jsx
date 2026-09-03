import { createContext, useContext, useState } from 'react';

// Context API Pattern — global state jo kai components/pages ke beech share hoti hai
// bina props ko har level pe manually pass kiye (prop-drilling avoid karta hai)
const DoctorContext = createContext(null);

export const DoctorProvider = ({ children }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [surveyAnswers, setSurveyAnswers] = useState({});

  return (
    <DoctorContext.Provider value={{
      selectedDoctor, setSelectedDoctor,
      selectedService, setSelectedService,
      surveyAnswers, setSurveyAnswers,
    }}>
      {children}
    </DoctorContext.Provider>
  );
};

// Custom Hook Pattern — Context ko consume karne ka clean tareeqa
export const useDoctorContext = () => {
  const ctx = useContext(DoctorContext);
  if (!ctx) throw new Error('useDoctorContext must be used inside DoctorProvider');
  return ctx;
};
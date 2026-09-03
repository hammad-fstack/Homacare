export const SYMPTOM_FLOWS = {
  sexual: [
    {
      id: 'q1',
      question: 'What kind of support do you need most?',
      options: ['Stronger erections', 'Last longer', 'Both'],
      response: "You're not alone — many men experience this, and it's treatable.",
    },
    {
      id: 'q2',
      question: 'Which symptoms have you experienced?',
      options: ['Trouble getting hard', 'Not lasting long', 'Not satisfying partner'],
      response: 'Thanks for sharing — this helps our doctors recommend the right support.',
    },
    {
      id: 'q3',
      question: 'Which treatment would you prefer?',
      options: ['Medication-based', 'Therapy-based', 'Both'],
      response: "Whether it's performance or confidence, we've helped others feel like themselves again.",
    },
  ],
  fertility: [
    {
      id: 'q1',
      question: 'What brings you here today?',
      options: ['Trying to conceive', 'Hormonal imbalance', 'Birth control guidance'],
      response: "Every journey is different — we're here to help you find the right path.",
    },
    {
      id: 'q2',
      question: 'Have you had any previous fertility treatment?',
      options: ['Yes, ongoing', 'Yes, in the past', 'No, first time'],
      response: 'Thanks for sharing — this helps your doctor personalize your plan.',
    },
    {
      id: 'q3',
      question: 'What is your main goal from this consultation?',
      options: ['Diagnosis', 'Treatment plan', 'Second opinion'],
      response: "We'll match you with a specialist who fits your goals best.",
    },
  ],
  mental: [
    {
      id: 'q1',
      question: 'What are you struggling with most?',
      options: ['Anxiety', 'Stress', 'Sleep issues'],
      response: "It's okay to ask for help — many people go through this too.",
    },
    {
      id: 'q2',
      question: 'How long have you felt this way?',
      options: ['Few weeks', 'Few months', 'Over a year'],
      response: 'Thanks for sharing — this helps us understand your situation better.',
    },
    {
      id: 'q3',
      question: 'What kind of support are you looking for?',
      options: ['Talk therapy', 'Medication', 'Both'],
      response: "We'll connect you with a specialist suited to your needs.",
    },
  ],
  general: [
    {
      id: 'q1',
      question: 'What brings you in today?',
      options: ['General checkup', 'Specific concern', 'Follow-up visit'],
      response: "Thanks for letting us know — we'll make sure your doctor is prepared.",
    },
    {
      id: 'q2',
      question: 'How long has this been going on?',
      options: ['Few days', 'Few weeks', 'Longer'],
      response: 'Thanks for sharing — this helps your doctor understand your situation.',
    },
    {
      id: 'q3',
      question: 'What would you like out of this consultation?',
      options: ['Diagnosis', 'Treatment plan', 'Peace of mind'],
      response: "We'll make sure you get the guidance you need.",
    },
  ],
};

// Keyword-based Strategy Pattern — specialty ke string mein jo bhi keyword mile,
// usi ke hisaab se sahi question-set choose hota hai. Exact spelling match ki zaroorat nahi,
// isliye MockAPI se "Fertility doctor", "Reproductive Medicine", "Gynecologist" — sab kaam karenge
const SPECIALTY_KEYWORDS = {
  sexual: ['sexual', 'urolog', 'erectile'],
  fertility: ['fertility', 'gynec', 'reproductive', 'obstetric', 'women'],
  mental: ['psych', 'mental', 'therapy', 'counsel'],
};

export const getSymptomFlowForSpecialty = (specialty) => {
  if (!specialty) return SYMPTOM_FLOWS.general;
  const lower = specialty.toLowerCase();

  for (const [flowKey, keywords] of Object.entries(SPECIALTY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return SYMPTOM_FLOWS[flowKey];
    }
  }
  return SYMPTOM_FLOWS.general;
};  
export const METRIC_CARDS = [
  { key: 'consultations', label: 'Consultations', subtitle: 'Last Month', highlight: true },
  { key: 'labTests', label: 'Lab Tests', subtitle: 'In Progress', highlight: false },
  { key: 'prescriptions', label: 'Prescriptions', subtitle: 'Active', highlight: false },
];

export const EMPTY_STATE_CONFIG = {
  consultations: { icon: '📅', message: 'No Consultations' },
  labTests: { icon: '🪴', message: 'No Lab Tests' },
  activity: { icon: '🔔', message: 'Nothing Here' },
};
export const METRIC_CARDS = [
  { key: 'consultations', label: 'Consultations', subtitle: 'Last Month', highlight: false },
  { key: 'labTests', label: 'Lab Tests', subtitle: 'In Progress', highlight: false },
  { key: 'prescriptions', label: 'Prescriptions', subtitle: 'Active', highlight: false },
];

export const LAB_STATUS_STYLES = {
  pay: 'bg-blue-600 hover:bg-blue-700',
  addDetails: 'bg-blue-600 hover:bg-blue-700',
  track: 'bg-blue-600 hover:bg-blue-700',
  view: 'bg-emerald-500 hover:bg-emerald-600',
};

export const LAB_STATUS_LABELS = {
  pay: 'Pay Now',
  addDetails: 'Add Details',
  track: 'Track Status',
  view: 'View result',
};

export const EMPTY_STATE_CONFIG = {
  consultations: { icon: '📅', message: 'No Consultations' },
  labTests: { icon: '🪴', message: 'No Lab Tests' },
  activity: { icon: '🔔', message: 'Nothing Here' },
};
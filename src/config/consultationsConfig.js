export const CONSULTATION_STATUS = {
  UPCOMING: 'upcoming',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const STATUS_STYLES = {
  [CONSULTATION_STATUS.UPCOMING]: 'bg-emerald-100 text-emerald-700',
  [CONSULTATION_STATUS.COMPLETED]: 'bg-gray-100 text-gray-600',
  [CONSULTATION_STATUS.CANCELLED]: 'bg-red-100 text-red-600',
};
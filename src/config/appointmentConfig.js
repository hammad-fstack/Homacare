export const SESSION_DURATIONS = [15, 30, 45];

export const WEEK_DAYS = [
  { label: 'Mon', date: '01' },
  { label: 'Tue', date: '02' },
  { label: 'Wed', date: '03' },
  { label: 'Thu', date: '04' },
  { label: 'Fri', date: '05' },
  { label: 'Sat', date: '06' },
  { label: 'Sun', date: '07' },
];

// Kuch slots disabled dikhane hain (jaisa screenshot mein 15:00 aur 18:00 grey hain)
export const TIME_SLOTS = [
  { time: '9:00 am', disabled: false },
  { time: '10:00 am', disabled: false },
  { time: '11:00 am', disabled: false },
  { time: '12:00 pm', disabled: false },
  { time: '13:00 pm', disabled: false },
  { time: '14:00 pm', disabled: false },
  { time: '15:00 pm', disabled: true },
  { time: '16:00 pm', disabled: false },
  { time: '17:00 pm', disabled: false },
  { time: '18:00 pm', disabled: true },
  { time: '19:00 pm', disabled: false },
  { time: '20:00 pm', disabled: false },
];
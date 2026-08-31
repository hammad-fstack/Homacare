// Working hours (jaise "09:00") ko minutes mein convert karta hai (easy math ke liye)
const timeToMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

// Minutes ko wapas "9:00 am" jaisi readable string mein convert karta hai
const minutesToTimeLabel = (totalMinutes) => {
  let hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  const minuteStr = minutes.toString().padStart(2, '0');
  return `${hours}:${minuteStr} ${period}`;
};

// Ye asal function hai — doctor ke working hours ko session duration ke hisaab se
// slots mein tor deta hai. Koi hardcoded time slot nahi — sab calculate hota hai.
export const generateTimeSlots = (workingHours, durationMinutes) => {
  const startMinutes = timeToMinutes(workingHours.start);
  const endMinutes = timeToMinutes(workingHours.end);
  const slots = [];

  for (let current = startMinutes; current + durationMinutes <= endMinutes; current += durationMinutes) {
    const slotStart = minutesToTimeLabel(current);
    const slotEnd = minutesToTimeLabel(current + durationMinutes);
    slots.push({
      label: `${slotStart} - ${slotEnd}`,
      startMinutes: current,
    });
  }

  return slots;
};

// Doctor ki rate aur duration se price calculate karta hai, uski currency ke sath
export const calculatePrice = (doctor, durationMinutes) => {
  const amount = doctor.ratePerMinute * durationMinutes;
  return {
    amount,
    formatted: `${doctor.currencySymbol}${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`,
  };
};

// Text (string) ko ek number seed mein convert karta hai
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return hash;
};

// Seeded random number generator - same seed se hamesha same sequence dega,
// lekin seed thora sa badalne par (duration/doctor/din) bilkul alag sequence banega
const mulberry32 = (seed) => {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Har duration mein kitne slots "booked" dikhane hain (jaisa tumne bataya)
const DURATION_BOOKED_COUNTS = { 15: 7, 30: 6, 45: 4, 60: 3 };

// Har (doctor + din + duration) combination ke liye alag-alag, poori list mein
// spread hue slots ko "already booked" bana deta hai. Seeded Fisher-Yates shuffle
// use karte hain taake result genuinely random-jaisa lage lekin refresh pe same rahe,
// aur har doctor/din/duration ka pattern ek dusre se bilkul mukhtalif ho
export const getBookedSlotIndices = (doctorId, dayLabel, durationMinutes, totalSlots) => {
  const bookedIndices = new Set();
  if (totalSlots === 0) return bookedIndices;

  const seed = hashString(`${doctorId}-${dayLabel}-${durationMinutes}`);
  const rng = mulberry32(seed);

  const indices = Array.from({ length: totalSlots }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }

  const numBooked = Math.min(totalSlots, DURATION_BOOKED_COUNTS[durationMinutes] || 3);

  for (let i = 0; i < numBooked; i++) {
    bookedIndices.add(indices[i]);
  }

  return bookedIndices;
};
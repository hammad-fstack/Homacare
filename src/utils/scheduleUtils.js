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
// Example: 9:00-17:00 working hours, 15 min duration -> 9:00-9:15, 9:15-9:30, ...
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
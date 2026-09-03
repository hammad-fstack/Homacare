const pool = require('../config/db');

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const timeToMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

const minutesToTime = (totalMinutes) => {
  const h = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const m = (totalMinutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

// GET /api/doctors/:id/availability?date=2026-09-10&duration=30
const getAvailability = async (req, res) => {
  const { id } = req.params;
  const { date, duration } = req.query;

  if (!date || !duration) {
    return res.status(400).json({ error: 'date and duration query params are required' });
  }

  const durationMinutes = parseInt(duration, 10);
  const dayOfWeek = DAY_NAMES[new Date(date).getDay()];

  try {
    // 1. Get this doctor's schedule for this day of week
    const scheduleResult = await pool.query(
      `SELECT is_off_day, start_time, end_time FROM doctor_schedules
       WHERE doctor_id = $1 AND day_of_week = $2`,
      [id, dayOfWeek]
    );

    if (scheduleResult.rows.length === 0 || scheduleResult.rows[0].is_off_day) {
      return res.json({ date, dayOfWeek, availableSlots: [] });
    }

    const { start_time, end_time } = scheduleResult.rows[0];
    const startMinutes = timeToMinutes(start_time);
    const endMinutes = timeToMinutes(end_time);

    // 2. Get any manually blocked slots for this exact date
    const blockedResult = await pool.query(
      `SELECT start_time, end_time FROM unavailable_slots
       WHERE doctor_id = $1 AND date = $2`,
      [id, date]
    );

    // 3. Get already booked appointments for this exact date
    const bookedResult = await pool.query(
      `SELECT start_time, end_time FROM appointments
       WHERE doctor_id = $1 AND appointment_date = $2 AND status = 'scheduled'`,
      [id, date]
    );

    const blockedRanges = [...blockedResult.rows, ...bookedResult.rows].map((r) => ({
      start: timeToMinutes(r.start_time),
      end: timeToMinutes(r.end_time),
    }));

    // 4. Generate candidate slots, filter out any that overlap a blocked range
    const availableSlots = [];
    for (let t = startMinutes; t + durationMinutes <= endMinutes; t += durationMinutes) {
      const slotStart = t;
      const slotEnd = t + durationMinutes;

      const overlaps = blockedRanges.some(
        (range) => slotStart < range.end && slotEnd > range.start
      );

      if (!overlaps) {
        availableSlots.push(`${minutesToTime(slotStart)} - ${minutesToTime(slotEnd)}`);
      }
    }

    res.json({ date, dayOfWeek, availableSlots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAvailability };
const pool = require('../config/db');

// Doctor sets/updates their weekly schedule
const setSchedule = async (req, res) => {
  const { schedule } = req.body;
  // expected format: [{ day_of_week: 'Mon', is_off_day: false, start_time: '09:00', end_time: '17:00' }, ...]

  if (!schedule || !Array.isArray(schedule)) {
    return res.status(400).json({ error: 'schedule array is required' });
  }

  try {
    const doctorResult = await pool.query('SELECT id FROM doctors WHERE user_id = $1', [req.user.userId]);
    if (doctorResult.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }
    const doctorId = doctorResult.rows[0].id;

    for (const day of schedule) {
      await pool.query(
        `INSERT INTO doctor_schedules (doctor_id, day_of_week, is_off_day, start_time, end_time)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (doctor_id, day_of_week)
         DO UPDATE SET is_off_day = $3, start_time = $4, end_time = $5`,
        [doctorId, day.day_of_week, day.is_off_day || false, day.start_time || null, day.end_time || null]
      );
    }

    res.json({ message: 'Schedule saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Doctor views their own schedule
const getMySchedule = async (req, res) => {
  try {
    const doctorResult = await pool.query('SELECT id FROM doctors WHERE user_id = $1', [req.user.userId]);
    if (doctorResult.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }
    const doctorId = doctorResult.rows[0].id;

    const scheduleResult = await pool.query(
      'SELECT * FROM doctor_schedules WHERE doctor_id = $1 ORDER BY day_of_week',
      [doctorId]
    );

    res.json({ schedule: scheduleResult.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { setSchedule, getMySchedule };
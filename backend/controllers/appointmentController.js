const pool = require('../config/db');

const timeToMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

// POST /api/appointments — patient books an appointment
const createAppointment = async (req, res) => {
  const { doctorId, date, startTime, durationMinutes } = req.body;

  if (!doctorId || !date || !startTime || !durationMinutes) {
    return res.status(400).json({ error: 'doctorId, date, startTime and durationMinutes are required' });
  }

  try {
    // Confirm the requester is a patient
    const patientResult = await pool.query('SELECT id FROM patients WHERE user_id = $1', [req.user.userId]);
    if (patientResult.rows.length === 0) {
      return res.status(404).json({ error: 'Patient profile not found' });
    }
    const patientId = patientResult.rows[0].id;

    // Get doctor's fee
    const doctorResult = await pool.query('SELECT consultation_fee FROM doctors WHERE id = $1', [doctorId]);
    if (doctorResult.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    const price = doctorResult.rows[0].consultation_fee;

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = startMinutes + parseInt(durationMinutes, 10);
    const endTime = `${Math.floor(endMinutes / 60).toString().padStart(2, '0')}:${(endMinutes % 60).toString().padStart(2, '0')}`;

    // IMPORTANT: re-check availability on the backend before booking (never trust frontend alone)
    const conflictResult = await pool.query(
      `SELECT id FROM appointments
       WHERE doctor_id = $1 AND appointment_date = $2 AND status = 'scheduled'
       AND start_time < $3 AND end_time > $4`,
      [doctorId, date, endTime, startTime]
    );

    if (conflictResult.rows.length > 0) {
      return res.status(409).json({ error: 'This slot is no longer available' });
    }

    const insertResult = await pool.query(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date, start_time, end_time, duration_minutes, price)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [patientId, doctorId, date, startTime, endTime, durationMinutes, price]
    );

    res.status(201).json({ message: 'Appointment booked successfully', appointmentId: insertResult.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createAppointment };
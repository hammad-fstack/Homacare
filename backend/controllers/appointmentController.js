const pool = require('../config/db');

const timeToMinutes = (time) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
};

const createAppointment = async (req, res) => {
    const { doctorId, date, startTime, durationMinutes } = req.body;

    if (!doctorId || !date || !startTime || !durationMinutes) {
        return res.status(400).json({ error: 'doctorId, date, startTime and durationMinutes are required' });
    }

    try {
        const patientResult = await pool.query('SELECT id FROM patients WHERE user_id = $1', [req.user.userId]);
        if (patientResult.rows.length === 0) {
            return res.status(404).json({ error: 'Patient profile not found' });
        }
        const patientId = patientResult.rows[0].id;

        const doctorResult = await pool.query('SELECT consultation_fee FROM doctors WHERE id = $1', [doctorId]);
        if (doctorResult.rows.length === 0) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        const price = doctorResult.rows[0].consultation_fee;

        const startMinutes = timeToMinutes(startTime);
        const endMinutes = startMinutes + parseInt(durationMinutes, 10);
        const endTime = `${Math.floor(endMinutes / 60).toString().padStart(2, '0')}:${(endMinutes % 60).toString().padStart(2, '0')}`;

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

// GET /api/appointments/my — works for both patient and doctor (based on role)
const getMyAppointments = async (req, res) => {
    try {
        let result;

        if (req.user.role === 'patient') {
            const patientResult = await pool.query('SELECT id FROM patients WHERE user_id = $1', [req.user.userId]);
            if (patientResult.rows.length === 0) {
                return res.status(404).json({ error: 'Patient profile not found' });
            }
            const patientId = patientResult.rows[0].id;

            result = await pool.query(
                `SELECT a.id, a.appointment_date, a.start_time, a.end_time, a.status, a.price,
                d.name AS doctor_name, d.specialty, d.avatar AS doctor_avatar
         FROM appointments a
         JOIN doctors d ON a.doctor_id = d.id
         WHERE a.patient_id = $1
         ORDER BY a.appointment_date DESC, a.start_time DESC`,
                [patientId]
            );
        } else if (req.user.role === 'doctor') {
            const doctorResult = await pool.query('SELECT id FROM doctors WHERE user_id = $1', [req.user.userId]);
            if (doctorResult.rows.length === 0) {
                return res.status(404).json({ error: 'Doctor profile not found' });
            }
            const doctorId = doctorResult.rows[0].id;

            result = await pool.query(
                `SELECT a.id, a.appointment_date, a.start_time, a.end_time, a.duration_minutes, a.status, a.price,
          p.name AS patient_name, p.avatar AS patient_avatar
   FROM appointments a
   JOIN patients p ON a.patient_id = p.id
   WHERE a.doctor_id = $1
   ORDER BY a.appointment_date DESC, a.start_time DESC`,
                [doctorId]
            );

        } else {
            return res.status(403).json({ error: 'Not authorized' });
        }

        res.json({ appointments: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// PATCH /api/appointments/:id/cancel — patient or doctor cancels an appointment
const cancelAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const appointmentResult = await pool.query('SELECT * FROM appointments WHERE id = $1', [id]);
        if (appointmentResult.rows.length === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        const appointment = appointmentResult.rows[0];

        // Verify this user is actually part of this appointment
        if (req.user.role === 'patient') {
            const patientResult = await pool.query('SELECT id FROM patients WHERE user_id = $1', [req.user.userId]);
            if (patientResult.rows[0]?.id !== appointment.patient_id) {
                return res.status(403).json({ error: 'Not authorized to cancel this appointment' });
            }
        } else if (req.user.role === 'doctor') {
            const doctorResult = await pool.query('SELECT id FROM doctors WHERE user_id = $1', [req.user.userId]);
            if (doctorResult.rows[0]?.id !== appointment.doctor_id) {
                return res.status(403).json({ error: 'Not authorized to cancel this appointment' });
            }
        }

        await pool.query(`UPDATE appointments SET status = 'cancelled' WHERE id = $1`, [id]);

        res.json({ message: 'Appointment cancelled successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { createAppointment, getMyAppointments, cancelAppointment };
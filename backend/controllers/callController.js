const pool = require('../config/db');
const { createNotification } = require('./notificationController');

// Call start hone ka sirf record rakhte hain — WebRTC peers khud Socket.IO se connect hote hain,
// koi external room-URL banane ki zaroorat nahi
const startCall = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const existing = await pool.query(
      'SELECT * FROM call_sessions WHERE appointment_id = $1',
      [appointmentId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        'UPDATE call_sessions SET is_active = true, started_by = $1 WHERE appointment_id = $2',
        [req.user.role, appointmentId]
      );
    } else {
      await pool.query(
        `INSERT INTO call_sessions (appointment_id, started_by, is_active)
         VALUES ($1, $2, true)`,
        [appointmentId, req.user.role]
      );
    }

    // Dusre party ko "call started" notification bhejo
    const apptInfo = await pool.query(
      `SELECT p.user_id AS patient_user_id, d.user_id AS doctor_user_id
       FROM appointments a
       JOIN patients p ON p.id = a.patient_id
       JOIN doctors d ON d.id = a.doctor_id
       WHERE a.id = $1`,
      [appointmentId]
    );

    if (apptInfo.rows.length > 0) {
      const { patient_user_id, doctor_user_id } = apptInfo.rows[0];
      const notifyUserId = req.user.role === 'doctor' ? patient_user_id : doctor_user_id;
      await createNotification(
        notifyUserId,
        'call_started',
        'Your consultation call has started',
        `Join now to connect with your ${req.user.role === 'doctor' ? 'doctor' : 'patient'}.`,
        appointmentId
      );
    }

    res.json({ message: 'Call started', appointmentId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not start call' });
  }
};

const getCallStatus = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const result = await pool.query(
      'SELECT is_active, started_by FROM call_sessions WHERE appointment_id = $1',
      [appointmentId]
    );
    if (result.rows.length === 0) return res.json({ active: false });
    const row = result.rows[0];
    res.json({ active: row.is_active, startedBy: row.started_by });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const endCall = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    await pool.query('UPDATE call_sessions SET is_active = false WHERE appointment_id = $1', [appointmentId]);
    res.json({ message: 'Call ended' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { startCall, getCallStatus, endCall };
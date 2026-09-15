const pool = require('../config/db');
const { createRoom } = require('../services/dailyService');

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
      return res.json({ roomUrl: existing.rows[0].room_url });
    }

    const roomName = `appt-${appointmentId}`;
    const room = await createRoom(roomName);

    await pool.query(
      `INSERT INTO call_sessions (appointment_id, room_url, room_name, started_by, is_active)
       VALUES ($1, $2, $3, $4, true)`,
      [appointmentId, room.url, roomName, req.user.role]
    );

    res.json({ roomUrl: room.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not start call' });
  }
};

const getCallStatus = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const result = await pool.query(
      'SELECT room_url, is_active, started_by FROM call_sessions WHERE appointment_id = $1',
      [appointmentId]
    );
    if (result.rows.length === 0) return res.json({ active: false });
    const row = result.rows[0];
    res.json({ active: row.is_active, roomUrl: row.room_url, startedBy: row.started_by });
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
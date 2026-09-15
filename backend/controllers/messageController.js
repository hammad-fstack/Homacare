const pool = require('../config/db');

const getMessages = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const result = await pool.query(
      `SELECT id, sender_role, message, created_at FROM consultation_messages
       WHERE appointment_id = $1 ORDER BY created_at ASC`,
      [appointmentId]
    );
    res.json({ messages: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const sendMessage = async (req, res) => {
  const { appointmentId } = req.params;
  const { message } = req.body;
  const senderRole = req.user.role;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO consultation_messages (appointment_id, sender_role, message)
       VALUES ($1, $2, $3) RETURNING id, sender_role, message, created_at`,
      [appointmentId, senderRole, message.trim()]
    );
    res.status(201).json({ message: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getMessages, sendMessage };
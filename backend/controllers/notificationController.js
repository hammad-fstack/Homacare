const pool = require('../config/db');

const getMyNotifications = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, type, title, body, related_appointment_id, is_read, created_at
       FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 30`,
      [req.user.userId]
    );
    res.json({ notifications: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2', [id, req.user.userId]);
    res.json({ message: 'Marked as read' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    await pool.query('UPDATE notifications SET is_read = true WHERE user_id = $1', [req.user.userId]);
    res.json({ message: 'All marked as read' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Internal helper — koi bhi controller isay call karke notification create kar sakta hai
const createNotification = async (userId, type, title, body, appointmentId = null) => {
  await pool.query(
    `INSERT INTO notifications (user_id, type, title, body, related_appointment_id) VALUES ($1, $2, $3, $4, $5)`,
    [userId, type, title, body, appointmentId]
  );
};

module.exports = { getMyNotifications, markAsRead, markAllAsRead, createNotification };
const pool = require('../config/db');

// Get list of all doctors (for patients to browse)
const getAllDoctors = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT d.id, d.name, d.specialty, d.experience, d.bio, d.avatar, d.consultation_fee, d.currency_symbol
       FROM doctors d
       ORDER BY d.id`
    );
    res.json({ doctors: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single doctor's details by id
const getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT d.id, d.name, d.specialty, d.experience, d.bio, d.avatar, d.consultation_fee, d.currency_symbol
       FROM doctors d WHERE d.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json({ doctor: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
// GET /api/doctors/me — logged-in doctor apni profile dekhta hai
const getMyProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT d.id, d.name, d.specialty, d.experience, d.bio, d.avatar, d.consultation_fee, d.currency_symbol, u.email
       FROM doctors d
       JOIN users u ON u.id = d.user_id
       WHERE d.user_id = $1`,
      [req.user.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }
    res.json({ doctor: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /api/doctors/me — logged-in doctor apni profile update karta hai
const updateMyProfile = async (req, res) => {
  const { name, specialty, experience, bio, avatar, consultation_fee } = req.body;

  try {
    const result = await pool.query(
      `UPDATE doctors
       SET name = COALESCE($1, name),
           specialty = COALESCE($2, specialty),
           experience = COALESCE($3, experience),
           bio = COALESCE($4, bio),
           avatar = COALESCE($5, avatar),
           consultation_fee = COALESCE($6, consultation_fee)
       WHERE user_id = $7
       RETURNING id, name, specialty, experience, bio, avatar, consultation_fee, currency_symbol`,
      [name, specialty, experience, bio, avatar, consultation_fee, req.user.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }
    res.json({ doctor: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllDoctors, getDoctorById, getMyProfile, updateMyProfile };
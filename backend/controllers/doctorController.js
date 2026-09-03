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

module.exports = { getAllDoctors, getDoctorById };
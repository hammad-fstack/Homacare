const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { sendOtpEmail } = require('../services/emailService');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const signup = async (req, res) => {
  const { email, password, name, phone } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password and name are required' });
  }

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'This email is already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userResult = await pool.query(
      `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'patient') RETURNING id`,
      [email, passwordHash]
    );
    const userId = userResult.rows[0].id;

    await pool.query(
      `INSERT INTO patients (user_id, name, phone) VALUES ($1, $2, $3)`,
      [userId, name, phone || null]
    );

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query(
      `INSERT INTO otp_verifications (user_id, otp_code, expires_at) VALUES ($1, $2, $3)`,
      [userId, otp, expiresAt]
    );

    await sendOtpEmail(email, otp);
    console.log(`[SIGNUP OTP] sent to ${email}`);

    res.status(201).json({ message: 'Signup successful, OTP sent', userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = userResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query(
      `INSERT INTO otp_verifications (user_id, otp_code, expires_at) VALUES ($1, $2, $3)`,
      [user.id, otp, expiresAt]
    );

    await sendOtpEmail(email, otp);
    console.log(`[LOGIN OTP] sent to ${email}`);

    res.json({ message: 'OTP sent', userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.status(400).json({ error: 'userId and otp are required' });
  }

  try {
    const otpResult = await pool.query(
      `SELECT * FROM otp_verifications
       WHERE user_id = $1 AND verified = false
       ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );

    if (otpResult.rows.length === 0) {
      return res.status(400).json({ error: 'No OTP found, try again' });
    }

    const otpRecord = otpResult.rows[0];

    if (new Date() > new Date(otpRecord.expires_at)) {
      return res.status(400).json({ error: 'OTP expired, please try again' });
    }

    if (otpRecord.attempts >= 5) {
      return res.status(429).json({ error: 'Too many wrong attempts, please try again' });
    }

    if (otpRecord.otp_code !== otp) {
      await pool.query('UPDATE otp_verifications SET attempts = attempts + 1 WHERE id = $1', [otpRecord.id]);
      return res.status(400).json({ error: 'Wrong OTP' });
    }

    await pool.query('UPDATE otp_verifications SET verified = true WHERE id = $1', [otpRecord.id]);

    const userResult = await pool.query('SELECT id, email, role FROM users WHERE id = $1', [userId]);
    const user = userResult.rows[0];

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'Verified and logged in', user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
// GET /api/auth/me — check if currently logged in (used by frontend on app load)
const getMe = async (req, res) => {
  try {
    const userResult = await pool.query(
      `SELECT u.id, u.email, u.role,
              COALESCE(p.name, d.name) AS name,
              COALESCE(p.avatar, d.avatar) AS avatar
       FROM users u
       LEFT JOIN patients p ON p.user_id = u.id
       LEFT JOIN doctors d ON d.user_id = u.id
       WHERE u.id = $1`,
      [req.user.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: userResult.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

module.exports = { signup, login, verifyOtp, getMe, logout };
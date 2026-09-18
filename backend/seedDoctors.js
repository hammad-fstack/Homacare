require('dotenv').config();
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Testing ke liye sab doctors ka same password — baad mein badal sakte hain
const DEFAULT_PASSWORD = 'Doctor123!';

const DOCTORS = [
  { email: 'dr.hassan@homacare.test', name: 'Dr. Hassan', specialty: 'Fertility Specialist', experience: '8 years', bio: 'Fertility and reproductive health Specialist.', fee: 150 },
  { email: 'dr.ayesha@homacare.test', name: 'Dr. Ayesha Khan', specialty: 'Gynecologist', experience: '10 years', bio: 'Women\'s health and hormonal balance expert.', fee: 180 },
  { email: 'dr.waizz@homacare.test', name: 'Dr. Waizz', specialty: 'Cardiology', experience: '6 years', bio: 'Cardiology, years of experience providing excellent care.', fee: 200 },
  { email: 'dr.faheem@homacare.test', name: 'Dr. Faheem Ahmad', specialty: 'Neurosurgeon', experience: '12 years', bio: 'Neurosurgery and brain health specialist.', fee: 250 },
  { email: 'dr.wasif@homacare.test', name: 'Dr. Wasif', specialty: 'Physiotherapist', experience: '5 years', bio: 'Physical therapy and recovery specialist.', fee: 120 },
  { email: 'dr.farha@homacare.test', name: 'Dr. Farha Ali', specialty: 'Hormone Specialist', experience: '9 years', bio: 'Hormonal balance and endocrinology expert.', fee: 160 },
  { email: 'dr.layla@homacare.test', name: 'Dr. Layla Hassan', specialty: 'Fertility & Hormone Specialist', experience: '7 years', bio: 'Fertility panel testing and hormone health specialist.', fee: 170 },
  { email: 'dr.ahmad@homacare.test', name: 'Dr. Ahmad Mansoor', specialty: 'Urologist', experience: '11 years', bio: 'Sexual wellness and urology specialist.', fee: 190 },
  { email: 'dr.sara@homacare.test', name: 'Dr. Sara Malik', specialty: 'Psychiatrist', experience: '8 years', bio: 'Mental health and stress management specialist.', fee: 175 },
  { email: 'dr.usman@homacare.test', name: 'Dr. Usman Tariq', specialty: 'General Physician', experience: '15 years', bio: 'General health checkups and consultations.', fee: 100 },
  { email: 'dr.zainab@homacare.test', name: 'Dr. Zainab Rehman', specialty: 'Obstetrician', experience: '10 years', bio: 'Pregnancy and  maternal health specialist.', fee: 210 },
  { email: 'dr.bilal@homacare.test', name: 'Dr. Bilal Sheikh', specialty: 'Counselor', experience: '6 years', bio: 'Talk therapy and counseling specialist.', fee: 140 },
];

const seed = async () => {
  const client = await pool.connect();
  try {
    const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);

    for (const doc of DOCTORS) {
      // Pehle users table mein entry
      const userResult = await client.query(
        `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'doctor') RETURNING id`,
        [doc.email, passwordHash]
      );
      const userId = userResult.rows[0].id;

      // Phir doctors table mein extra info
      await client.query(
        `INSERT INTO doctors (user_id, name, specialty, experience, bio, consultation_fee)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [userId, doc.name, doc.specialty, doc.experience, doc.bio, doc.fee]
      );

      console.log(`Added: ${doc.name} (${doc.email})`);
    }

    console.log(`\nDone! ${DOCTORS.length} doctors seeded. Sab ka password: ${DEFAULT_PASSWORD}`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    client.release();
    pool.end();
  }
};

seed();

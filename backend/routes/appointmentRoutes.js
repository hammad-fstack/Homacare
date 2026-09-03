const express = require('express');
const router = express.Router();
const { createAppointment } = require('../controllers/appointmentController');
const { protect, patientOnly } = require('../middleware/authMiddleware');

router.post('/', protect, patientOnly, createAppointment);

module.exports = router;
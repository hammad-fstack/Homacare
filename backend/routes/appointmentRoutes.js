const express = require('express');
const router = express.Router();
const { createAppointment, getMyAppointments, cancelAppointment } = require('../controllers/appointmentController');
const { protect, patientOnly } = require('../middleware/authMiddleware');

router.post('/', protect, patientOnly, createAppointment);
router.get('/my', protect, getMyAppointments);
router.patch('/:id/cancel', protect, cancelAppointment);

module.exports = router;
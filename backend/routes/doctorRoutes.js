const express = require('express');
const router = express.Router();
const { getAllDoctors, getDoctorById, getMyProfile, updateMyProfile } = require('../controllers/doctorController');
const { getAvailability } = require('../controllers/availabilityController');
const { protect, doctorOnly } = require('../middleware/authMiddleware');

router.get('/', getAllDoctors);
router.get('/me', protect, doctorOnly, getMyProfile);
router.put('/me', protect, doctorOnly, updateMyProfile);
router.get('/:id/availability', getAvailability);
router.get('/:id', getDoctorById);

module.exports = router;
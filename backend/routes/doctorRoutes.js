const express = require('express');
const router = express.Router();
const { getAllDoctors, getDoctorById } = require('../controllers/doctorController');
const { getAvailability } = require('../controllers/availabilityController');

router.get('/', getAllDoctors);
router.get('/:id/availability', getAvailability);
router.get('/:id', getDoctorById);

module.exports = router;
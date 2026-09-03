const express = require('express');
const router = express.Router();
const { setSchedule, getMySchedule } = require('../controllers/scheduleController');
const { protect, doctorOnly } = require('../middleware/authMiddleware');

router.post('/my-schedule', protect, doctorOnly, setSchedule);
router.get('/my-schedule', protect, doctorOnly, getMySchedule);

module.exports = router;
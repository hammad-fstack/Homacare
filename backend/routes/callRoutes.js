const express = require('express');
const router = express.Router();
const { startCall, getCallStatus, endCall } = require('../controllers/callController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:appointmentId/start', protect, startCall);
router.get('/:appointmentId/status', protect, getCallStatus);
router.post('/:appointmentId/end', protect, endCall);

module.exports = router;
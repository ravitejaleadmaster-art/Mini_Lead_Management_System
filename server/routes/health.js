const express = require('express');
const router = express.Router();

// Use 'router' instead of 'app'
router.get('/health', (req, res) => {
    // res.status(200).json({ status: 'UP', timestamp: new Date() });
    res.send('Health API is running...');
});

module.exports = router;

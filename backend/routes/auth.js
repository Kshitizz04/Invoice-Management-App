const express = require('express');
const router = express.Router();

// Route to check server time
router.get('/check-time', (req, res) => {
  const serverTime = new Date().toISOString();
  res.status(200).json({ serverTime });
});

module.exports = router;

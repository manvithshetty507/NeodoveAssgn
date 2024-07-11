const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);

// Add a route to verify the token
router.post('/verify-token', auth, (req, res) => {
    res.json({ isAuthenticated: true });
});
  

module.exports = router;
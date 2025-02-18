const express = require('express');
const router = express.Router();
const { signup, login, getDashboard } = require('../controllers/auth.controller');
const authenticate = require('../middleware/authenticate');

router.post('/signup', signup);
router.post('/login', login);
router.get('/api/dashboard', authenticate, getDashboard);

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');


router.get('/login', authController.loginUser);
router.get('/logout',authController.logoutUser);
router.post('/registro',authController.registroUser);

module.exports = router;

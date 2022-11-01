const express = require('express');


const router = express.Router();
const userCtrl = require('../controllers/user.js');


router.post('/register', userCtrl.register);

module.exports = router;
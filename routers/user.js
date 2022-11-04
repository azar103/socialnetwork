const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.js');
const passport = require('passport');
require('../config/passport')(passport);
const multer = require('multer');
const storage = require('../config/multer');
const upload = multer({ storage }).single('profilePicturePath');
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.put('/:_id',passport.authenticate('jwt', {session:false}), upload, userCtrl.updateUser);
router.get('/currentUser',passport.authenticate('jwt', {session:false}) , userCtrl.currentUser);

module.exports = router;
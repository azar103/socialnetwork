const router = require('express').Router();
const multer = require('multer');
const storage = require('../config/multer');
const upload = multer({ storage }).single('postPath');
const postCtrl = require('../controllers/post');
const passport = require('passport');
require('../config/passport')(passport);

router.get('/',passport.authenticate('jwt', {session: false}), postCtrl.getAllPosts);
router.post('/new', upload,passport.authenticate('jwt', {session: false}), postCtrl.createPost);
router.route('/:_id').put(upload, passport.authenticate('jwt', { session: false }), postCtrl.updatePost)
    .delete(passport.authenticate('jwt', { session: false }), postCtrl.deletePost);

module.exports = router;
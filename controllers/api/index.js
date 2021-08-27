const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const newPostRoutes = require('./newpost-routes');



router.use('/users', userRoutes);
// router.use('/comments', commentRoutes);
router.use('/posts', newPostRoutes);

module.exports = router;
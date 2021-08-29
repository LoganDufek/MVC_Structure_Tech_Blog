const router = require('express').Router();

//require the different api routes
const userRoutes = require('./user-routes.js');
const newPostRoutes = require('./newpost-routes');
const commentRoutes = require('./comment-routes')

// Define the name for the routes to be used in the other controller files
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/posts', newPostRoutes);

//Export so they can be used outside this file
module.exports = router;
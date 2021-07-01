const router = require('express').Router();

//Bring in the apiRoutes:
const userRoute = require('./userRoutes');
const postRoute = require('./postRoutes');
const commentRoute = require('./commentRoutes');


//Use the the routes and set the path:
router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);

module.exports = router;
const router = require('express').Router();

//Bring in the apiRoutes:
const userRoute = require('./userRoutes');
const postRoute = require('./postRoutes');


//Use the the routes and set the path:
router.use('/users', userRoute);
router.use('/posts', postRoute);

module.exports = router;
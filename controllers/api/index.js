const router = require('express').Router();

//Bring in the apiRoutes:
const userRoute = require('./userRoutes');


//Use the the routes and set the path:
router.use('/users', userRoute);

module.exports = router;
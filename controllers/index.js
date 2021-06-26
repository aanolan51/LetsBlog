const router = require('express').Router();

//Bring in paths from the API routes:
const apiRoutes = require('./api');
//Bring in the dashboard:
const dashboard = require('./dashboardRoutes');
//Bring in the homepage:
const homepage = require('./homeRoutes');

//Use the the routes and set the path:
router.use('/api', apiRoutes);
router.use('/dashboard', dashboard);
router.use('/', homepage);

module.exports = router;
const router = require('express').Router();

//Bring in paths from the API routes:
const apiRoutes = require('/api');
//Bring in the dashboard path:
const dashboard = require('./dashboardRoutes');

//Use the the routes and set the path:
router.use('/api', apiRoutes);
router.use('/', dashboard);

module.exports = router;
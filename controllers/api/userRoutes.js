//Pull in requirements
const router = require('express').Router();
const { User } = require('../../models');

//create a user at path /api/users:
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
          //Save the user's id to check at other points while they are still in their logged in session to allow them to view other pages:
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

//Log-in a user at api/users:
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
  //If the user enters an invalid username for the login:
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please re-enter!' });
        return;
      }
  //Check the password the user has entered against the password stored:
      const correctPassword = await userData.checkPassword(req.body.password);
  
      if (!correctPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please re-enter!' });
        return;
      }
  // Save the user id to the session for use to check on other page access:
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
});

//Log out a user at /api/users:
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});


//Update User

//Delete user

module.exports = router;
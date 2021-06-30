const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//Add in withAuth to include the authorization for logins. Only go to dashboard page when logged in. Show all posts for the user:
router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userPostData = await Post.findAll({
        where: {user_id: req.session.user_id},
        attributes: { exclude: ['password'] },
        include: [{ model: User }, {model: Comment, include:{model:User}}],
      });
  
      //Getting multiple posts, so need to map the data:
      //Need to name it posts to match the partial in the handlebars:
      const posts = userPostData.map((userpost) => userpost.get({ plain: true }));
  
      res.render('dashboard', {
        posts,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
  module.exports = router;

const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//Add in withAuth to include the authorization for logins. Only go to dashboard page when logged in. Show all posts for the user:
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userPostData = await Post.findAll(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: User }, {model: Comment, include:{model:User}}],
      });
  
      const user = userPostData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Include an edit button for one post. When button clicked, bring to edit page. Find the one post by id:


  //Include a new post create button/path:

  module.exports = router;

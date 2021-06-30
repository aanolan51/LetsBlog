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

  //Include an edit button for one post. When button clicked, bring to edit page. Find the one post by id in order to display content in the form:
  //Use path /dashboard/:id:
  router.get('/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
          },
          {
            model: Comment,
            //Within the Comment model, include the user so that the comment's user can be accessed:
            include: {model: User}
          },
        ],
      });
  
      const post = postData.get({ plain: true });
      // console.log(post);
  
      res.render('editPost', {
        post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;

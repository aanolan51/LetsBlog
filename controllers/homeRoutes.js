const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
// DO we need to bring in the connection file? 


//Route to get all blog posts and display with the user who created them:
router.get('/', async (req, res) => {
    try {
      // Get all blog posts and JOIN with the username who wrote the post:
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: {exclude: ['password']},
          },
        ],
      });
      //Check that data is being pulled:
        //res.status(200).json(postData);

      // Serialize data so the template can read it:
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into the homepage handlebar template:
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/blogpost/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: {exclude: ['password']},
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
  
      res.render('onePost', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Get request to check if logged in and if not render the login page:
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    //if already logged in, go to the dashboard for the user:
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

//Get request to check if logged in, and if not render the signup page:
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    //if already logged in, go to the dashboard for the user:
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});



  module.exports = router;
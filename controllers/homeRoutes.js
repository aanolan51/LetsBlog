const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
// DO we need to bring in the connection file? 

router.get('/', async (req, res) => {
    try {
      // Get all blog posts and JOIN with the username who wrote the post:
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
      //Check that data is being pulled:
        //res.status(200).json(postData);

      // Serialize data so the template can read it:
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

 

  module.exports = router;
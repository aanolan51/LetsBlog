// Pull in all requirements
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Include an edit button for one post. When button clicked, bring to edit page. Find the one post by id in order to display content in the form:
  //Use path /api/posts/editpost/:id:
  router.get('/editpost/:id', async (req, res) => {
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
  
      res.render('editPost', {
        post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Get request to make a new post and if not render the login page:
router.get('/createpost', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll(req.params.id, {
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

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('newPost', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
 

// Create a new post at path /api/posts/createpost:
router.post('/createpost', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        title:req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
});

//Update a post at the path /api/posts/editpost/:id:
router.put('/editpost/:id', withAuth, async (req, res) => {
    // update a post by its `id` value
    try {
      const updatePost= await Post.update(
        {title: req.body.title,
        post_content: req.body.post_content},
        {where: {id: req.params.id, user_id: req.session.user_id,}}
      );
      res.status(200).json(updatePost);
    } catch (err) {
      res.status(400).json(err);
    }
});

//Delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
          //destory the specific post id where the user is the current logged in user:
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No Post Found' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
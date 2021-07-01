// Pull in all requirements
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get all comments from a user or by post?


//Edit a comment
//Update a post at the path /api/comments/:id:
router.put('/:id', withAuth, async (req, res) => {
    // update a post by its `id` value
    try {
      const updateComment= await Comment.update(
        {comment: req.body.comment, 
        postID: req.body.postID},
        {where: {id: req.params.id, userID: req.session.user_id,}}
      );
      res.status(200).json(updateComment);
    } catch (err) {
      res.status(400).json(err);
    }
});

//Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentdata = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentdata) {
        res.status(404).json({ message: 'No comment found!' });
        return;
      }
  
      res.status(200).json(commentdata);
    } catch (err) {
      res.status(500).json(err);
    }
});

//Add a new comment
router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userID: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;
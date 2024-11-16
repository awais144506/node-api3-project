const express = require('express');
const User = require("./users-model.js");
const Post = require("../posts/posts-model");
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');// The middleware functions also need to be required

const router = express.Router();



router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  User.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
      next();
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    await User.remove(req.params.id);
    res.json(req.user);
  }
  catch (error) {
    next(error);
  }
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
    .then(post => {
      res.status(200).json(post);
      next();
    })
    .catch(err => {
      next(err);
    });
});

router.post('/:id/posts', validatePost, validateUserId, async (req, res, next) => {
  try{
      const result = await Post.insert({
        user_id:req.params.id,
        text:req.text,
      });
      res.status(201).json(result);
  }
  catch(err)
  {
    next(err);
  }
});

router.use((error, req, res, next) => { //eslint-disable-line
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Something Happend In the Server !!!!"
  });
});
// do not forget to export the router

module.exports = router;
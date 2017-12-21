const express = require('express'),
      router = express.Router(),
      post = require('../models/post');

router.get('/', function(req, res) {
  post.find((err, posts) => {
    if (err)
      res.status(500).send(`Error occured: ${err}`);
    else
      res.json(posts);
  });
});

router.get('/:postId', function(req, res) {
  res.send(`Post: ${req.params.postId}`); 
});

module.exports = router;
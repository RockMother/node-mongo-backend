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

router.post('/', function(req, res){
  post.create({
    title: req.body.title,
    texts: req.body.texts.map(text => { return { text: text }; }),
    categories: req.body.categories.map (name => { return { name: name }; })
  }, (err, model) => {
    if (err)
      res.status(500).send(err);
    else 
      res.status(201);
  });
});

router.get('/:postId', function(req, res) {
  res.send(`Post: ${req.params.postId}`); 
});

module.exports = router;
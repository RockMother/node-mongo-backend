const express = require('express');
const router = express.Router();
const post = require('../models/post');
const upload = require('../utils/upload');


router.get('/', function (req, res) {
    post.find((err, posts) => {
        if (err)
            res.status(500).send(`Error occured: ${err}`);
        else
            res.json(posts.reverse());
    });
});

router.post('/', upload.any(), function (req, res) {

    const requestPost = {
        _id: req.body._id,
        title: req.body.title,
        texts: req.body.texts ? req.body.texts.map(text => {
            return {text: text};
        }) : null,
        categories: req.body.categories ? req.body.categories.map(name => {
            return {name: name};
        }) : null,
        images: req.files ? req.files.map(image => {
            return {
                imageId: image.id,
                imageName: image.metadata.originalname
            }
        }) : []
    };

    console.log(requestPost._id);

    if (requestPost._id) {

        console.log("/UPDATE")

        post.update(requestPost)

    } else {

        console.log("/CREATE")

        post.create(requestPost, (err, model) => {
            if (err)
                res.status(500).send(err);
            else
                res.status(201).send(model);
        });
    }
});

router.get('/:postId', function (req, res) {
    res.send(`Post: ${req.params.postId}`);
});

module.exports = router;
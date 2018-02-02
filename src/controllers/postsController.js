const express = require('express');
const router = express.Router();
const post = require('../models/post');
const upload = require('../utils/upload');


router.get('/', function (req, res) {
    let query = null;
    if (req.query.category) {
        query = post.find({
            'categories.name': req.query.category
        });
    } else {
        query = post.find();
    }
    query.exec((err, posts) => {
        if (err)
            res.status(500).send(`Error occured: ${err}`);
        else
            res.json(posts.reverse());
    });
});

router.post('/', upload.any(), function (req, res) {

    console.log(req.body)

    const requestPost = {
        _id: req.body._id,
        title: req.body.title,
        texts: JSON.parse(req.body.texts),
        categories: JSON.parse(req.body.categories),
        images: req.files ? req.files.map(image => {
            return {
                imageId: image.id,
                imageName: image.metadata.originalname
            }
        }) : []
    };

    console.log(requestPost._id);

    if (requestPost._id && requestPost._id !== "new") {

        console.log(requestPost);

        post.update({_id: requestPost._id}, requestPost, {upsert: true}, (err, model) => {

            if (err) {
                res.status(500).send(err);
                console.log(err);
            } else
                res.status(201).send(model);
        });

    } else {

        console.log("/CREATE");

        post.create(requestPost, (err, model) => {
            if (err)
                res.status(500).send(err);
            else
                res.status(201).send(model);
        });
    }
});

router.get('/:postId', function (req, res) {
    res.status(404).send();
});

router.delete('/:postId', function (req, res) {

    post.remove({_id: req.params.postId}, function (err) {
        if (err)
            res.status(500).send(err);

        else
            res.status(201).send();
    });

});

module.exports = router;
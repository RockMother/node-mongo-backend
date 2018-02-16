const express = require('express');
const router = express.Router();
const post = require('../models/post');
const upload = require('../utils/upload');

router.get('/', function (req, res) {
    let query = null;
    if (req.query.category) {
        query = post.find({
            'categories.name': req.query.category
        }).populate('template');
    } else {
        query = post.find().populate('template');
    }
    query.exec((err, posts) => {
        if (err)
            res.status(500).send(`Error occured: ${err}`);
        else
            res.json(posts.reverse());
    });
});

function getPostFromBody(req) {
    let images = JSON.parse(req.body.images);
    if (req.files) {
        req.files.forEach(image => {
            images.push({
                imageId: image.id,
                imageName: image.metadata.originalname
            });
        });
    }
    return {
        title: req.body.title,
        template: JSON.parse(req.body.template),
        texts: JSON.parse(req.body.texts),
        categories: JSON.parse(req.body.categories),
        images: images
    };
};

router.post('/', upload.any(), function (req, res) {
    post.create(getPostFromBody(req), (err, model) => {
        if (err) {
            res.status(500).send(err);
        } else {
            model.populate('template', function(err, populatedModel){
                if (err) 
                    res.status(500).send(err);
                else 
                    res.status(200).send(populatedModel);
            });
        }
    });
});

router.put('/', upload.any(), function (req, res) {
    const requestPost = getPostFromBody(req);
    post.findById(req.body._id, function (err, model) {
        if (err)
            res.status(500).send(err);
        else {
            model.set(requestPost);
            model.save(function (err, updatedModel) {
                if (err)
                    res.status(500).send(err);
                else {
                    updatedModel.populate('template', function(err, populatedModel){
                        if (err) 
                            res.status(500).send(err);
                        else 
                            res.status(200).send(populatedModel);
                    });
                }
            });
        }
    });
});

router.get('/:postId', function (req, res) {
    res.status(404).send();
});

router.delete('/:postId', function (req, res) {
    post.remove({ _id: req.params.postId }, function (err) {
        if (err)
            res.status(500).send(err);
        else
            res.sendStatus(200);
    });
});

module.exports = router;
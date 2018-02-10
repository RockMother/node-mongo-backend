const express = require('express');
const router = express.Router();
const template = require('../models/template');

router.get('/', function (req, res) {
    template.find((err, templates) => {
        if (err)
            res.status(500).send(`Error occured: ${err}`);
        else
            res.json(templates);
    });
});

function getTemplateFromBody(req) {
    return {
        title: req.body.title,
        template: req.body.template
    };
}

router.post('/', function (req, res) {
    template.create(getTemplateFromBody(req), function (err, model) {
        if (err)
            return res.status(500).send(err);
        else {
            res.status(201).send(model);
        }
    })
});

router.put('/', function (req, res) {
    template.findById(req.body._id, function (err, model) {
        if (err)
            res.status(500).send(err);
        else {
            model.set(getTemplateFromBody(req));
            model.save(function (err, updatedModel) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(200).send(updatedModel);
                }
            });
        }
    })
});

router.delete('/:templateId', function (req, res) {
    template.remove({ _id: req.params.templateId }, function (err) {
        if (err)
            res.status(500).send(err);
        else
            res.sendStatus(200);
    });
});

module.exports = router;
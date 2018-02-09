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

module.exports = router;
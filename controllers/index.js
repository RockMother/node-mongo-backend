const express = require('express');
const router = express.Router();

router.get('/test', function (request, response) {
    response.json({test: 'ok'});
});

router.use('/posts', require('./posts'));

module.exports = router;
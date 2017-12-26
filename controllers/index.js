const express = require('express');
const router = express.Router();

router.get('/test', function (request, response) {
    response.json({test: 'ok'});
});

router.use('/posts', require('./postsController'));
router.use('/image', require('./imageController'));

module.exports = router;
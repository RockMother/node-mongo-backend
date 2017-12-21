const express = require('express'),
    router = express.Router();

router.use('/posts', require('./posts'));

module.exports = router;
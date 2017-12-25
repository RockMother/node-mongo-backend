const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const multer = require('multer');

const storage = GridFsStorage({
    db: mongoose.connection.db,
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    },
    metadata: function (req, file, cb) {
        cb(null, { originalname: file.originalname });
    },
    root: 'Images'
});

module.exports = multer({
    storage: storage
});
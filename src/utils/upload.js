const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const multer = require('multer');

const storage = GridFsStorage({
    db: mongoose.connection.db,
    file: (req, file) => {
        return {
            metadata: {
                originalname: file.originalname,
                orderInTemplate: parseInt(file.fieldname.substr(1))
            }
        };
    }
});

module.exports = multer({
    storage: storage
});
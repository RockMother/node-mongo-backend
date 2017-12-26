const express = require('express');
const router = express.Router();
const Grid = require('gridfs-stream');
const mongoose = require("mongoose");
Grid.mongo = mongoose.mongo;
const gfs = new Grid(mongoose.connection.db);

router.get('/', function (req, res) {
    const query = {};
    if (req.query.id) {
        query._id =  mongoose.Types.ObjectId(req.query.id);
    } else if (req.query.imageName) {
        query.metadata = {
            originalname: req.query.imageName
        }
    } else {
        return res.status(400).end();
    }
    gfs.files.find(query).toArray((err, files) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            if (files.length === 0)
                return res.status(400).send("Image not found");
            else {
                res.writeHead(200, { 'Content-Type': files[0].contentType });

                const readstream = gfs.createReadStream({
                    filename: files[0].filename
                });

                readstream.on('data', (chunk) => {
                    res.write(chunk);
                });

                readstream.on('end', () => {
                    res.end();
                });

                readstream.on('error', (err) => {
                    console.error(err);
                    throw err;
                });
            }
        }
    });

});

module.exports = router;
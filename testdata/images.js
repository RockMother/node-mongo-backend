const mongoose = require('mongoose');
const fs = require('fs');
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

module.exports = () => {
    const gfs = new Grid(mongoose.connection.db);
    const folderName = './testdata/testimages/';

    return Promise.all(fs.readdirSync(folderName).map(file => {
        return new Promise((resolve, reject) => {
            const gfs = new Grid(mongoose.connection.db);
            const writeStream = gfs.createWriteStream({
                metadata: {
                    originalname: file
                }
            });
            fs.createReadStream(folderName + file).pipe(writeStream);
            writeStream.on('close', resolve);
            writeStream.on('error', reject);
        });
    }));
}


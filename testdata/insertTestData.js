const mongoose = require('mongoose');
const fs = require('fs');
const Grid = require('gridfs-stream');
const Post = require('./../src/models/post');
Grid.mongo = mongoose.mongo;
module.exports = () => {
    const gfs = new Grid(mongoose.connection.db);
    const folderName = './testdata/testimages/';
    const images = [
        'Возвращение.jpg',
        'Двоечка.jpg',
        'Серцеедка.jpg',
    ];
    return Promise.all(images.map(imageName => {
        return new Promise((resolve, reject) => {
            const writeStream = gfs.createWriteStream({
                metadata: {
                    originalname: imageName
                }
            });
            fs.createReadStream(folderName + imageName).pipe(writeStream);
            writeStream.on('close', (file) => {
                Post.create({
                    title: "Lorem Ipsum",
                    texts: [{
                        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Nunc sed dapibus lorem, in elementum ligula. 
                    Donec malesuada aliquet tortor, et euismod ipsum suscipit et.`}],
                    categories: [{ name: 'lorem' }, { name: 'ipsum' }, { name: 'dolor' }, { name: 'consectetur' }],
                    images: [{ imageId: file._id, imageName: imageName }]
                }).then(() => {
                    console.log(`Post with ${file.metadata.originalname} created.`);
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            });
        });
    }));
}

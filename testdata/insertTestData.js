const mongoose = require('mongoose');
const fs = require('fs');
const Grid = require('gridfs-stream');
const Post = require('./../src/models/post');

Grid.mongo = mongoose.mongo;

module.exports = () => {

    const gfs = new Grid(mongoose.connection.db);
    const folderName = './testdata/testimages/';

    Post.create({

        title: 'Some item for shop',
        texts: [{text: 'Some test text here, with separators. \nИ другой язык.'}],
        categories: [{ name: 'Store' }],
        images: []

    });

    Post.create({

        title: 'Some item i want to sell..',
        texts: [{text: ''}],
        categories: [{ name: 'Store' }],
        images: []

    });

    Post.create({

        title: '',
        texts: [{text: 'E-mail \nOther site'}],
        categories: [{ name: 'Contacts' }],
        images: []

    });

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
                    title: 'Some test title here: ' + file._id,
                    texts: [{text: 'Some test text here, with separators. \nИ другой язык.'}],
                    categories: [{ name: 'Art' }, { name: 'Some' }],
                    images: [{ imageId: file._id, imageName: imageName }]
                }).then(() => {
                    console.log('Post with ' + file.metadata.originalname + 'created.');
                    resolve();
                }).catch(err => {
                    reject(err);
                });

            });

            // >:O :о :. очень плохой код

        });
    }));
};

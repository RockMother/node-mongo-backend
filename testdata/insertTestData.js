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
        texts: [{text: 'Some test text here, with separators. <br />И другой язык.'}],
        categories: [{ name: 'Store' }],
        images: []

    });

    Post.create({

        title: 'Some item i want to sell..',
        texts: [],
        categories: [{ name: 'Store' }],
        images: []

    });

    Post.create({

        title: 'Some email for our users<br />And one more contact<br /><br />And phone here<br /><br />+9999999999',
        texts: [],
        categories: [{ name: 'Contacts' }],
        images: []
    });

    Post.create({

        title: 'Some text test',
        texts: [{text: 'The Cape sparrow (Passer melanurus) is a southern African bird. A medium-sized sparrow at 14–16 centimetres (5.5–6.3 in), it has distinctive grey, brown, and chestnut plumage, with large pale head stripes in both sexes.<br /><br /> The male has some bold black and white markings on its head and neck. The species inhabits semi-arid savannah, cultivated areas, and towns, from the central coast of Angola to eastern South Africa and Swaziland. Cape sparrows primarily eat seeds, along with soft plant parts and insects. They typically breed in colonies, and search for food in large nomadic flocks. The nest can be constructed in a tree, bush, cavity, or disused nest of another species. A typical clutch contains three or four eggs, and both parents are involved, from nest building to feeding the young. The species is common in most of its range and coexists successfully in urban habitats with two of its relatives, the native southern grey-headed sparrow and the house sparrow, an introduced species. The Cape sparrow\'s population has not decreased significantly, and is not seriously threatened by human activities.'}],
        categories: [{ name: 'Art' }],
        images: []
    });

    const images = [
        // 'Возвращение.jpg',
        // 'Двоечка.jpg',
        // 'Серцеедка.jpg',
    ];

    fs.readdirSync('./testdata/testimages/').map(file => {

        // console.log(file.toString())

        images.push(file.toString())
    });

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
                    texts: [],
                    categories: [{ name: 'Art' }, { name: 'Some' }],
                    images: [{ imageId: file._id, imageName: imageName },{ imageId: file._id, imageName: imageName },{ imageId: file._id, imageName: imageName },{ imageId: file._id, imageName: imageName },{ imageId: file._id, imageName: imageName },{ imageId: file._id, imageName: imageName }]
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

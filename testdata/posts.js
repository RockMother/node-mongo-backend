const insertImages = require('./images');
const insertTemplates = require('./templates');
const Post = require('./../src/models/post');

module.exports = () => {
    return insertImages().then(files => {
        return insertTemplates().then(templates => {
            Post.create({
                title: 'Some item for shop',
                texts: [{ text: 'Some test text here, with separators. <br />И другой язык.' }],
                categories: [{ name: 'Store' }],
                images: [],
                template: templates[0]._id 
            });
            Post.create({
                title: 'Some item i want to sell..',
                texts: [],
                categories: [{ name: 'Store' }],
                images: [],
                template: templates[1]._id
            });
            Post.create({
                title: 'Some email for our users<br />And one more contact<br /><br />And phone here:<br /><br /><b>+9 (999) 999 9999</b>',
                texts: [],
                categories: [{ name: 'Contacts' }],
                images: [],
                template: templates[1]._id
            });
            Post.create({
                title: 'Some text test',
                texts: [{ text: 'The Cape sparrow (Passer melanurus) is a southern African bird. A medium-sized sparrow at 14–16 centimetres (5.5–6.3 in), it has distinctive grey, brown, and chestnut plumage, with large pale head stripes in both sexes.<br /><br /> The male has some bold black and white markings on its head and neck. The species inhabits semi-arid savannah, cultivated areas, and towns, from the central coast of Angola to eastern South Africa and Swaziland. Cape sparrows primarily eat seeds, along with soft plant parts and insects. They typically breed in colonies, and search for food in large nomadic flocks. The nest can be constructed in a tree, bush, cavity, or disused nest of another species. A typical clutch contains three or four eggs, and both parents are involved, from nest building to feeding the young. The species is common in most of its range and coexists successfully in urban habitats with two of its relatives, the native southern grey-headed sparrow and the house sparrow, an introduced species. The Cape sparrow\'s population has not decreased significantly, and is not seriously threatened by human activities.' }],
                categories: [{ name: 'Art' }],
                images: [],
                template: templates[1]._id
            });

            const promises = [];
            for (let i = 0; i < files.length; i++) {

                const images = [];
                for (let j = 0; j < Math.floor(Math.random() * 4); j++) {
                    if (i - j >= 0) {
                        const file = files[i - j];
                        images.push({ imageId: file._id, imageName: file.metadata.originalname });
                    }
                }
                promises.push(new Promise((resolve, reject) => {
                    Post.create({
                        title: 'Some test title here',
                        texts: [{ text: 'Some test text here, with separators. \nИ другой язык.' }],
                        categories: [{ name: 'Art' }, { name: 'Some' }],
                        images: images,
                        template: templates[0]._id 
                    }).then(() => {
                        console.log('Post with ' + images.length + ' images created.');
                        resolve();
                    }).catch(err => {
                        reject(err);
                    });
                }));
            }
            return Promise.all(promises);
        });
    });
}


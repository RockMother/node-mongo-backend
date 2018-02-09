const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postModel = new Schema({
    title: String,
    texts: [{text: String}],
    categories: [{name: String}],
    template: { template: String, title: String },
    images: [{ imageId: { type: mongoose.Schema.Types.ObjectId, ref: "fs.files" }, imageName: String} ]
});

module.exports = mongoose.model('Post', postModel);
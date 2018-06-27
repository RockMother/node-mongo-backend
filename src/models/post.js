const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postModel = new Schema({
    titles: [{ title: String, orderInTemplate: Number }],
    texts: [{ text: String, orderInTemplate: Number }],
    categories: [{ name: String }],
    template: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
    images: [{ 
        imageId: { type: mongoose.Schema.Types.ObjectId, ref: "fs.files" }, 
        imageName: String,
        orderInTemplate: Number
    }]
});

module.exports = mongoose.model('Post', postModel);
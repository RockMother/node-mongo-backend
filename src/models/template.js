const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const templateModel = new Schema({
    title: String,
    template: String
});

module.exports = mongoose.model('Template', templateModel);
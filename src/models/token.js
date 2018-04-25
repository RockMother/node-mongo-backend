const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenModel = new Schema({
    token: String,
});

module.exports = mongoose.model('Token', tokenModel);
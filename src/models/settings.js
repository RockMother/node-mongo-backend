const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsModel = new Schema({
    main: {

    },
    post: {

    },
    security: {

    }
});

module.exports = mongoose.model('Settings', settingsModel);
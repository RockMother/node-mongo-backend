const mongoose = require('mongoose');

module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose.connection.dropDatabase((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

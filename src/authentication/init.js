const passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;
const token = require('../models/token');

function initPassport() {
    passport.use('token', new CustomStrategy(
        function (req, done) {
            const userToken = req.header('tokenAPI');
            if (userToken) {
                token.find({ 'token': userToken }, (err, result) => {
                    if (err) {
                        done(null, false);
                    }
                    if (result[0].token === userToken) {
                        done(null, 'Admin');
                    } else {
                        done(null, false);
                    }
                });
            }
        }
    ));
}

module.exports = initPassport;
const Token = require('./../src/models/token');

module.exports = () => {
    return Token.create({
        token: process.env.ADMIN_TOKEN
    });
}
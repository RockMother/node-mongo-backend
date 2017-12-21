const express =  require("express"),
    mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost/node-mongo-backend-database');

app.use('/', express.static(__dirname + '/web'));

app.use(require('./controllers'));

app.listen(port, () => {
    console.log(`App runned on the port ${port}`);
});
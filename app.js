const express =  require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT;

app.use('/', express.static(__dirname + '/web'));
mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
});

app.use(require('./controllers'));

app.listen(port, () => {
    console.log(`App runned on the port ${port}`);
});
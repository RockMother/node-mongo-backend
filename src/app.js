const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true }, (error) => {
    if (error)
        console.error(`Connection error: ${error}`);
    else
        console.log(`Connected to database`);
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.json());
    app.use(require('./middlewares/cors'));
    app.use('/api', require('./controllers'));


    app.listen(port, () => {
        console.log(`App runned on the port ${port}`);
    });
});
mongoose.Promise = global.Promise;



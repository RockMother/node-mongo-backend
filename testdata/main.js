require('dotenv').config({path: '.env'});
const mongoose = require('mongoose');
const dropCurrentData = require('./dropCurrentData');
const insertTestData = require('./posts');

const MONGO_URL = process.env.MONGODB_URI;
console.log(MONGO_URL);
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, {
    useMongoClient: true,
}, (err) => {
    if (!err){
        console.log('Connected to database');
        dropCurrentData().then(() => {
            console.log("Database dropped");
            insertTestData().then(() => {
                console.log('Data inserted');
                process.exit();
            }).catch(err => {
                console.error(`Error occurred while inserting test data: ${err}`);
                process.exit();
            });
        }).catch(err => {
            console.error(`Error occurred while dropping database: ${err}`);
            process.exit();
        })
    }
})
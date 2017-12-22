const express =  require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
});


app.use(require('./middlewares/cors'));
app.use('/api', require('./controllers'));

app.listen(port, () => {
    console.log(`App runned on the port ${port}`);
});
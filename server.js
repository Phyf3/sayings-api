const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')


const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use('/', express.static(path.join(__dirname, 'static')))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

require('dotenv').config()
const dbpassword = process.env.DB_PWD
const db_user = process.env.DB_USER
const MONOGODB_URI = `mongodb+srv://${db_user}:${dbpassword}@quotes.b4hwg.mongodb.net/test`

mongoose.connect(process.env.MONGODB_URI || MONOGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.once('open', () => {
    console.log("Connected to MongoDB")
})
const QuotesRoutes = require('./routes/Quotes'); 

app.use('/quotes', QuotesRoutes)

app.listen(process.env.PORT || 5000, () => {
    console.log("Listening...")
})
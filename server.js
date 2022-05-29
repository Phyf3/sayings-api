const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json())

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

app.get('/', (req, res) => {
    res.send("Running")
})

const QuotesRoutes = require('./routes/Quotes'); 

app.use('/quotes', QuotesRoutes)

app.listen(process.env.PORT ||  3000, () => {
    console.log("Listening...")
})
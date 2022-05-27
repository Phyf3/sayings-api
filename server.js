const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/api-tut',{
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

app.listen(3000, () => {
    console.log("Listening on port 3000")
})
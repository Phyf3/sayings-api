const express = require("express")
const router = express.Router();
const Quote = require('../models/quotes')

router.get('/', async (req, res) => {
    const quotes = await Quote.find();
    res.json(quotes)
})

//create quotes
router.post('/new', async (req, res) => {

    //saving to db
    const newQuote = new Quote(req.body)
    const savedQuote = await newQuote.save()


    res.json(savedQuote)
})

//get a specific quote (by ID)
router.get('/get/:id', async (req, res) => {
    const q = await Quote.findById({_id : req.params.id})

    res.json(q)
})

//delete a quote (by ID)
router.delete('/delete/:id', async (req, res) => {
    const result = await Quote.findByIdAndDelete({_id : req.params.id})

    res.json(result)
})

//update a quote (by ID)
router.patch('/update/:id', async (req, res) => {
    const toUpdate = await Quote.updateOne({ _id : req.params.id} ,{ $set : req.body })
    res.json(toUpdate)
})

//get ransom quote
router.get('/random', async (req, res) => {
    const count = await Quote.countDocuments();

    const random = Math.floor(Math.random() * count)

    const q = await Quote.findOne().skip(random)

    res.json(q)
})

module.exports = router;
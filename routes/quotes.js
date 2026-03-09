const express = require('express')
const router = express.Router()
const { getAllQuotes, createQuote } = require('../controllers/quotesController')

// GET all quotes
router.get('/', getAllQuotes)

// POST a new quote
router.post('/', createQuote)



module.exports = router

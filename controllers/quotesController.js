const Quote = require('../models/Quote')

// GET all quotes
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find()
    res.json(quotes)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// POST a new quote
const createQuote = async (req, res) => {
  const { text, emotion, title, reason, lessons } = req.body

  if (!text || !title || !reason || !lessons) {
    return res.status(400).json({ message: "All required fields must be filled." })
  }

  try {
    const newQuote = await Quote.create({
      text: text.trim(),
      emotion: emotion?.trim(),
      title: title.trim(),
      reason: reason.trim(),
      lessons: lessons.trim()
    })
    res.status(201).json(newQuote)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error saving quote.' })
  }
}





module.exports = { getAllQuotes, createQuote }

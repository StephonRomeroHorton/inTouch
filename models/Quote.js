const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },
    emotion: String,
    title: {
      type: String,
      required: true,
      trim: true
    },
    reason: {
      type: String,
      required: true,
      trim: true
    },
    lessons: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
)


module.exports = mongoose.model('Quote', quoteSchema)




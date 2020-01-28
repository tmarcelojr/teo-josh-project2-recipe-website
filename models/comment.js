const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema ({
	text: String,
	rating: Number,
	imageUrl: String,
	name: String,
	date: {
	    type: Date,
	    default: Date.now
  }
})

// MODEL
const Comment = mongoose.model('Comment', commentSchema)

// EXPORT
module.exports = Comment
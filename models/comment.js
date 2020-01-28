const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema ({
	text: String,
	rating: Number,
	imageUrl: String,
	author: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' } ,
	date: {
	    type: Date,
	    default: Date.now
  }
})

// MODEL
const Comment = mongoose.model('Comment', commentSchema)

// EXPORT
module.exports = Comment
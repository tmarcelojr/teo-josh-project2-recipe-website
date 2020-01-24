const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema ({
	text: String,
	rating: Number,
	date: Date,
	imageUrl: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' }
})

// MODEL
const Comment = mongoose.model('Comment', commentSchema)

// EXPORT
module.exports = Comment
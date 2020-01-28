const mongoose = require('mongoose')
const commentSchema = require('./comment')

const recipeSchema = new mongoose.Schema({
	name: String,
	description: String,
	category: String,
	ingredients: String,
	instructions: String,
	imageUrl: String,
	creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ,
	comments: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Comment'
  	}],
	dateCreated: Date
})

// MODEL
const Recipe = mongoose.model('Recipe', recipeSchema)

// EXPORT
module.exports = Recipe
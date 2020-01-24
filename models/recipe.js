const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new mongoose.Schema({
	name: String,
	description: String,
	category: String,
	ingredients: [ ingredientSchema ],
	instructions: String,
	imageUrl: String,
	creator: { type: Schema.Types.ObjectId, ref: 'User' } ,
	comments: [ commentSchema ],
	dateCreated: Date
})

// MODEL
const Recipe = mongoose.model('Recipe', recipeSchema)

// EXPORT
module.exports = Recipe
const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema {
	name: String,
	amount: String
}

// MODEL
const Ingredient = mongoose.model('Ingredient', recipeSchema)

// EXPORT
module.exports = Ingredient
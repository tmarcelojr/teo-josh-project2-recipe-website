const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema {
	name: String,
	amount: String
}

// MODEL
const Ingredient = mongoose.model('Ingredient', ingredientSchema)

// EXPORT
module.exports = Ingredient
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ingredientSchema = new mongoose.Schema ({
	name: String,
	amount: String
})

// MODEL
const Ingredient = mongoose.model('Ingredient', ingredientSchema)

// EXPORT
module.exports = Ingredient
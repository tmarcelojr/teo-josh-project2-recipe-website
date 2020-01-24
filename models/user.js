const mongoose = require('mongoose')

const Schema = new mongoose.Schema {
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	imageUrl: String,
	location: String, 
	socialLinks: [ Strings ],
	emailAddress: String
}

// MODEL
const User = mongoose.model('User', recipeSchema)

// EXPORT
module.exports = User
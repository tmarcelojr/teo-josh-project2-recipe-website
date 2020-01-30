const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	imageUrl: String,
	location: String, 
	email: String,
	aboutMe: String
})

// MODEL
const User = mongoose.model('User', userSchema)

// EXPORT
module.exports = User
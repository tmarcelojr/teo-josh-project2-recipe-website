const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	imageUrl: String,
	location: String, 
	socialLinks: [{ 
		type: String }],
	emailAddress: String
})

// MODEL
const User = mongoose.model('User', userSchema)

// EXPORT
module.exports = User
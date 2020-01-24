require ('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.PORT
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')

// ------ DATABASE ------

// connect to db
require('./db/db') 

// ------ MIDDLEWARE ------
server.use(express.static('public')) 
server.use(bodyParser.urlencoded({ extended: false }))
server.use(methodOverride('_method'))

// ------ SESSION ------
server.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

// ------- CONTROLLERS -----
// const userController = require('./controllers/userController.js')
// server.use('/users', userController)

// const authController = require('./controllers/authController.js')
// server.use('/auth', authController)

// ------ ROUTES ------
server.get('/', (req, res) => {
	
})

server.get('*', (req, res) => {
	res.status(404).send('404 page not found')
})

server.listen(PORT, () => {
	const d = new Date()
	console.log(`${d.toLocaleString()}: Server running on port ${PORT}.`)	
})
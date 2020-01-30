require ('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.PORT
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const Recipe = require('./models/recipe')

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

// CUSTOM MIDDLEWARE FOR USERNAME AND USERID
server.use((req, res, next) => {
	if(req.session.loggedIn) {
		res.locals.username = req.session.username
		res.locals.userId = req.session.userId
		res.locals.loggedIn = req.session.loggedIn
		res.locals.recipe = req.session.recipe
		res.locals.dialogMessage = req.session.dialogMessage
	}
	else {
		res.locals.dialogMessage = undefined
		res.locals.loggedIn = false
		res.locals.username = ""
		res.locals.userId = undefined
		res.locals.recipe= undefined
	}
	if(req.session.homePage) {
		res.locals.homePage = true
	}
	else {
		res.locals.homePage = false
	}
	next()
})

// ------- CONTROLLERS -----
const userController = require('./controllers/userController.js')
server.use('/users', userController)

const authController = require('./controllers/authController.js')
server.use('/auth', authController)

const recipeController = require('./controllers/recipeController.js')
server.use('/recipes', recipeController)

const commentController = require('./controllers/commentController.js')
server.use('/comments', commentController)

// ------ ROUTES ------

// Creating user data 
server.get('/seed', (req, res) => {
	const data = require('./createData.js')
	// data.seedData()
	
})

// Recipe home page
server.get('/', async (req, res, next) => {
	const homePage = true
	res.render('index.ejs', {
		homePage: homePage
	})
})

server.get('*', (req, res) => {
	res.status(404).send('404 page not found')
})

server.listen(PORT, () => {
	const d = new Date()
	console.log(`${d.toLocaleString()}: Server running on port ${PORT}.`)	
})
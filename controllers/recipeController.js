const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const User = require('../models/user')
const isLoggedIn = require('../lib/isLoggedIn')
const loadRecipe = require('../lib/loadRecipe')

// ------- ROUTES ------

// Index page
router.get('/', async (req, res, next) => {
	try {
		const foundRecipes = await Recipe.find().populate('creator')
		// console.log('Found recipes', foundRecipes);
		res.render('recipes/index.ejs', {
			dialogMessage: req.session.dialogMessage,
			recipe: foundRecipes
		})
	} catch(err) {
		next(err)
	}
})

// New recipe page (added before show page to avoid cast error)
// Passed in middleware isLoggedIn
router.get('/new', isLoggedIn, async (req, res, next) => {
	try {
		res.render('recipes/new.ejs')
	} catch(err) {
		next(err)
	}
})

// Create recipe
router.post('/', async (req, res, next) => {
	try {
		const createdRecipe = await Recipe.create({
			name: req.body.name,
			category: req.body.category,
			ingredients: req.body.ingredients,
			instuctions: req.body.instructions,
			imageUrl: req.body.imageUrl,
			creator: req.session.userId,
			dateCreated: Date.now()
		})
		res.redirect('/recipes')
	} catch(err) {
		next(err)
	}
})

// Show page
router.get('/:id', async (req, res, next) => {
	try {
		const foundRecipe = await Recipe.findById(req.params.id).populate('comments.author')

		res.render('recipes/show.ejs', {
			dialogMessage: req.session.dialogMessage,
			recipe: foundRecipe,
			loggedInUser: req.session.userId
		})
	} catch(err) {
		next(err)
	}
})

// 

// Edit recipe page
router.get('/:id/edit', loadRecipe, async (req, res, next) => {
	try {
		res.render('recipes/edit.ejs', {
			recipe: res.locals.recipe,
			dialogMessage: req.session.dialogMessage
		})
	} catch(err) {
		next(err)
	}
})

// Update recipe
router.put('/:id', loadRecipe, async (req, res, next) => {
	try {
		const updatedRecipe = await Recipe
		.findByIdAndUpdate(req.params.id, req.body, { new: true })
		console.log('update recipe');
		res.redirect('/recipes')
	} catch(err) {
		next(err)
	}
})

// Delete recipe
router.delete('/:id', loadRecipe, async (req, res, next) => {
	try {
		const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id)
		res.redirect('/recipes')
	} catch(err) {
		next(err)
	}
})

// Export
module.exports = router
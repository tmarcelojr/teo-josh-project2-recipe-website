const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
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

// Show page
router.get('/:id', async (req, res, next) => {
	try {
		const foundRecipe = await Recipe.findById(req.params.id).populate('comments')

		res.render('recipes/show.ejs', {
			dialogMessage: req.session.dialogMessage,
			recipe: foundRecipe,
			loggedInUser: req.session.userId
		})
	} catch(err) {
		next(err)
	}
})

router.use(isLoggedIn)


// New recipe page

// router.use(loadRecipe)

// Edit recipe page
router.get('/:id/edit', loadRecipe, async (req, res, next) => {
	console.log('we are in edit controller');
	try {
		res.render('recipes/edit.ejs', {
			recipe: res.locals.recipe,
			dialogMessage: req.session.dialogMessage
		})
	} catch(err) {
		next(err)
	}
})

// Export
module.exports = router
const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')

// ------- ROUTES ------

// Index page
router.get('/', async (req, res, next) => {
	try {
		const foundRecipes = await Recipe.find().populate('creator')
		console.log('Found recipes', foundRecipes);
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
		const foundRecipe = await Recipe.findById(req.params.id)
		res.render('recipes/show.ejs', {
			dialogMessage: req.session.dialogMessage,
			recipe: foundRecipe
		})
	} catch(err) {
		next(err)
	}
})

// Export
module.exports = router
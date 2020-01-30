const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const Comment = require('../models/comment.js')
const User = require('../models/user')
const isLoggedIn = require('../lib/isLoggedIn')
const loadRecipe = require('../lib/loadRecipe')

// create
router.post('/:recipeId', isLoggedIn, async (req, res, next) => {
  try {
    const foundRecipe = await Recipe.findById(req.params.recipeId)
    // console.log("this is the res.locals id", userId)
    const createdComment = await Comment.create({

      text: req.body.commentText,
      rating: req.body.rating,
      author: req.session.userId,
      imageUrl: "fake",

    })

    foundRecipe.comments.push(createdComment)
    await foundRecipe.save()
    res.redirect('back')
  } catch(err) {
    next(err)
  }
})


// Destroy
router.delete("/:recipeId/:commentId", isLoggedIn, async (req, res, next) => {
	try {

		const recipe = await Recipe.findById(req.params.recipeId)
		recipe.comments.id(req.params.commentId).remove()
		await recipe.save()
		res.redirect('/recipes/' + recipe.id)
	} catch(err) {
		next(err)	
	}
})

// Edit
router.get("/:recipeId/:commentId/edit", isLoggedIn, async (req, res, next) => {
	try {
		res.render('recipes/edit.ejs', {
			recipe: res.locals.recipe,
			dialogMessage: req.session.dialogMessage
		})
	} catch(err) {
		next(err)
	}
})


module.exports = router
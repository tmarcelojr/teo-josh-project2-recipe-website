const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const Comment = require('../models/comment.js')

// create
router.post('/:recipeId', async (req, res, next) => {
  try {
    const foundRecipe = await Recipe.findById(req.params.recipeId)
    console.log("this is the req.params.recipeid", req.params.recipeId)
    console.log("this is the foundRecipe id", foundRecipe._id)
    const createdComment = await Comment.create({
      text: req.body.commentText,
      name: req.body.name
    })

    foundRecipe.comments.push(createdComment)
    await foundRecipe.save()

    res.redirect('/recipes/' + foundRecipe._id)
  } catch(err) {
    next(err)
  }
})

module.exports = router
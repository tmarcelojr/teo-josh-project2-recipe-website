const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Recipe = require('../models/recipe')
const Comment = require('../models/comment')
const requireAuth = require('../lib/requireAuth')

// ------- ROUTES -----

// USER PROFILE PAGE
router.get('/:id', async (req, res, next) => {
  try {
    // Not using req.params.id since we don't have ids for users yet
    const foundUser = await User.findOne({ username: "bb" })
    console.log('this is user bb', foundUser);
    res.render('users/show.ejs', {
      user: foundUser
    })
  } catch(err) {
    next(err)
  }
})

router.use(requireAuth)

// We probably wont' need a router for edit that page if we are 
// letting the user edit their profile page on the profile box 
// I created it just in case we decided not to go with the idea
router.get('/:id:edit', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.session.userId)
    res.render('users/edit.ejs', {
      user: foundUser
    })
  } catch(err) {
    next(err)
  }
})


// DELETE USER
router.get('/:id', async (req, res, next) => {
  try {
    // delete recipes/comments/ratings first
    // will make an if statement to give user the choice to delete
    // their recipes
    await Recipe.remove({ user: req.params.id })
    await Comment.remove({ user: req.params.id })
    // we don't have a rating model. Are we going to create a rating
    // model if we are going to let User have the choice to leave or
    // delete rating
    await Rating.remove({ user: req.params.id })
    await User.findByIdAndRemove(req.params.id)
    res.redirect('/')
  } catch(err) {
    next(err)
  }
})


// EXPORT
module.exports = router
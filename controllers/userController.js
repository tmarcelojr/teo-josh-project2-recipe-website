const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Recipe = require('../models/recipe')
const Comment = require('../models/comment')
const requireAuth = require('../lib/requireAuth')


// ------- ROUTES ------

// (Index) GET all users.
router.get('/', async (req, res, next) => {
  try {
    
    const foundUsers = await User.find()
    res.render('users/index.ejs', { 
      users: foundUsers,
      dialogMessage: req.session.dialogMessage })
    
    // clear the session message
    req.session.dialogMessage = undefined
  } 
  catch(err) {
      next(err) 
  }
  
})  

// (New) GET New form to enter new user. NOTE This must come before routes that display user (uses id).
// In authController

// (Show) GET one user.
router.get('/:id', async (req, res, next) => {
  try {
    
  } catch(err) {
      next(err) 
  }
  
})  

// --- Routes below require authorization. TODO Josh 1/25/20, 11:17 AM :Add auth controller later.
// router.use(requireAuth)

// (Edit) GET Edit form to edit user.
router.get('/:id/edit', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id)
    
    res.render("users/edit.ejs", {
      user: foundUser,
      sessionUsername: req.session.username,
      sessionUserId: req.session.userId,
      sessionLoggedIn: req.session.loggedIn,
      dialogMessage: req.session.dialogMessage
    })  
    // clear the session message
    req.session.dialogMessage = undefined
    
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

// (Update) PUT Edit form to post update to user.
router.put('/:id', async (req, res, next) => {
  try {

    
    // clear the session message
    req.session.dialogMessage = undefined

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
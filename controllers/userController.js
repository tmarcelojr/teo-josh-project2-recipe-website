const express = require('express')
const router = express.Router()
const User = require('../models/user')
// const Recipe = require('../models/recipe')
// const requireAuth = require('../lib/requireAuth')

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


// (Update) PUT Edit form to post update to user.
router.put('/:id', async (req, res, next) => {
  try {

    
    // clear the session message
    req.session.dialogMessage = undefined

  } catch(err) {
    next(err) 
  }
  
})  

// (Destroy) DELETE User from db.
router.delete('/:id', async (req, res, next) => {
  try {
    
  } catch(err) {
    next(err) 
  }
  
})  


// EXPORT
module.exports = router
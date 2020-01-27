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
    const foundUser = await User.findById(req.params.id)
    console.log('this is our user', foundUser);
    res.render('users/show.ejs', {
      user: foundUser,
      dialogMessage: req.session.dialogMessage
    })
  } catch(err) {
      next(err) 
  }
  
})

router.use(requireAuth)

// Delete user
router.delete('/:id', async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id)
    await req.session.destroy()
    res.redirect('/')
    console.log('Successfuly deleted user.');
  } catch(err) {
    next(err)
  }
})

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
    const updatedUser = await User.findOneAndUpdate(req.session.userId, req.body, { new: true })
    console.log('This is our body', req.body);
    console.log('This is our first name', req.body.firstName);
    res.redirect('/users/show')    
    req.session.dialogMessage = undefined
  } catch(err) {
    next(err)
  }
}) 







// EXPORT
module.exports = router
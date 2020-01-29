const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Recipe = require('../models/recipe')
const Comment = require('../models/comment')
const isLoggedIn = require('../lib/isLoggedIn')


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

// (Show) GET one user.
router.get('/:id', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id)
    // console.log('this is our user', foundUser);
    res.render('users/show.ejs', {
      user: foundUser,
      dialogMessage: req.session.dialogMessage
    })
  } catch(err) {
      next(err) 
  }
  
})

// (Edit) GET Edit form to edit user.
router.get('/:id/edit', isLoggedIn, async (req, res, next) => {
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
router.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const updatedUser = await User.findOneAndUpdate(req.session.userId, req.body, { new: true }) 
    res.redirect(`/users/${req.session.userId}`)    
    req.session.dialogMessage = undefined
  } catch(err) {
    next(err)
  }
}) 

// Delete user
router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const foundRecipes = await Recipe.find().populate('comments.author')

  //   // delete recipes
    if(req.body.deleteRecipes){
      await Recipe.deleteMany({ creator : req.params.id})
    } 


  // delete comments. Brute forcing through all recipes until we figure out how query can be refined.
    if(req.body.deleteComments){
      for (let i = 0; i < 5; i++) {

        for (let c = 0; c < foundRecipes[i].comments.length; c++) {

          if(foundRecipes[i].comments[c].author.id == req.params.id){
            foundRecipes[i].comments[c].remove()
            await foundRecipes[i].save()
          }
        }
      }      
    }

     // delete profile. User can only delete profile is comments also deleted.
    if(req.body.deleteProfile){
      if(req.body.deleteComments){
        const deletedUser = await User.findByIdAndRemove(req.params.id)
        req.session.loggedIn = false
        req.session.userId = undefined
        req.session.username = undefined
      } else {
        req.session.dialogMessage = "You must delete comments if you want to delete Profile."
      }
    }  

    res.redirect('/')
    console.log('Successfuly deleted user.');
  } catch(err) {
    next(err)
  }
})

// EXPORT
module.exports = router
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Recipe = require('../models/recipe')
// const requireAuth = require('../lib/requireAuth')

// ------- ROUTES ------

// Show
// router.get('/:id', async (req, res, next) => {
//   try {
//     // Not using req.params.id since we don't have ids for users yet
//     const foundUser = await User.findOne({ username: "bb" })
//     console.log('this is user bb', foundUser);
//     res.render('users/show.ejs', {
//       user: foundUser
//     })
//   } catch(err) {
//     next(err)
//   }
// })

// (Index) GET all users.
router.get('/', async (req, res, next) => {
  try {
    const foundUsers = await User.find()
    res.render('users/index.ejs', { users: foundUsers })
    
  } catch(err) {
    next(err) 
  }
  
})  

// (New) GET New form to enter new user. NOTE This must come before routes that display user (uses id).
router.get('/new', async (req, res, next) => {
  try {
    
  } catch(err) {
    next(err) 
  }
  
})  

// (Create) POST New user form.
router.post('/', async (req, res, next) => {
  try {
    
  } catch(err) {
    next(err) 
  }
  
})  

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
router.get(':id/edit', async (req, res, next) => {
  try {
    
  } catch(err) {
    next(err) 
  }
  
})  

// (Update) PUT Edit form to post update to user.
router.put('/:id', async (req, res, next) => {
  try {
    
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
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Recipe = require('../models/recipe')

// ------- ROUTES -----

// USER PROFILE PAGE
router.get('/:id', async (req, res, next) => {
  try {
    res.render('users/show.ejs')
  } catch(err) {
    next(err)
  }
})


// EXPORT
module.exports = router
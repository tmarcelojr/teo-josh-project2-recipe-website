const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Recipe = require('../models/recipe')
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


// EXPORT
module.exports = router
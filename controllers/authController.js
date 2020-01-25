const express = require('express')
const router = express.Router()
const User = require('../models/user')

// ------ ROUTES ------

// (New) GET new registration form.
router.get('/register', (req, res) => {
	
  res.render('auth/register.ejs', {
    dialogMessage: req.session.dialogMessage
  })

	// clear the session message
  	req.session.dialogMessage = undefined
})


// (Create) POST new user form and create in db
router.post('/register', async (req, res, next) => {
	// Get user input
	console.log("in register create")
	const requestedUsername = req.body.username
  	const requestedPassword = req.body.password

	const usernameTaken = await User.findOne({ 
	    username: requestedUsername
	  })

	  if(usernameTaken) { 
	    req.session.dialogMessage = `Username ${requestedUsername} already taken. Please choose a new one.`
	    res.redirect('/auth/register')
	  }

	  // username is available
	  else {
	    const createdUser = await User.create({
	      username: requestedUsername,
	      password: requestedPassword
	    })

	    // Update session
	    req.session.loggedIn = true
	    req.session.userId = createdUser._id
	    req.session.username = createdUser.username
	    req.session.dialogMessage = "Thanks for signing up, " + createdUser.username + ". " +
	    							"Please complete your profile."
	 	console.log("preparing to call user edit")
	    res.redirect(`/users/${createdUser._id}/edit`)
	  }
})





module.exports = router;
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
  console.log("requestedUsername", requestedUsername)

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

	    console.log("createdUser is ", createdUser)
	    // Update session
	    req.session.loggedIn = true
	    req.session.userId = createdUser._id
	    req.session.username = createdUser.username
	    req.session.dialogMessage = "Thanks for signing up, " + createdUser.username + ". " +
	    							"Please complete your profile."

	    res.redirect(`/users/${createdUser._id}/edit`)
	  }
})

// LOGIN AUTH
router.post('/login', async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username })
  if(!user) {
    req.session.message = "Invalid username or password."  
    res.redirect('/')
  }
  else {
    if(user.password == req.body.password) {
      req.session.loggedIn = true
      req.session.userId = user._id
      req.session.username = user.username
      console.log('Successfully logged in as', user.username );
      res.redirect('/')
    }
    else {
      req.session.message = "Invalid username or password."
      res.redirect('/')
    }
  }
})

// Logout current user
router.get('/logout', async (req, res, next) => {
	try {
		console.log('Successfully logged out');
		await req.session.destroy()
		res.redirect('/')
	} catch(err) {
		next(err)
	}
})



module.exports = router;
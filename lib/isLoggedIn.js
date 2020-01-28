module.exports = (req, res, next) => {
  if(!req.session.loggedIn) {
    dialogMessage = "You must be logged in to do that."
    res.redirect('/')
  } else {
    next()
  }
}

// Calling on this function will require all functions
// under this for user to be logged in and authenticated
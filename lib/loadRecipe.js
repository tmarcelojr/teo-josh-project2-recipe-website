const Recipe = require('../models/recipe')

module.exports = async (req, res, next) => {
	try	{
		const foundRecipe = await Recipe.findById(req.params.id)
 		if(foundRecipe.creator == req.session.userId) {
 			console.log('user owns recipe, yay');
			res.locals.recipe = foundRecipe
			next()
	  } 
		else {
	    req.session.dialogMessage = "You must be the creator of this recipe to modify."
	    res.redirect('/:id')
		}
  } catch(err) {
    next()
  }
}
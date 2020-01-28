# Recipe
* Index - renders but not styled
* Show - renders but not styled
		- Done. need to add button logic
* Delete - renders but not styled
* Edit - renders but not styled
* Update - renders but not styled
* New - renders but not styled


# Comments
* TODO: allow non users to make comments. But if user is logged in default their name on the comment.
* Index - haven't started
* Show - haven't started
* Delete - haven't started
* Edit - haven't started
* Update - haven't started
* New - haven't started

# User
* TODO: Add loadUser & delete removes recipes
		Delete should ask if they want to delete recipes, comments and/or profile.
		show checkbox to select delete of recipes, comments, profile.
		if they select all - destroy
		if they select to leave something then update the recipe/comment user to the anonymous user
		Hash password

* Index - renders but not styled. Don't show anonymous user.
* Show - renders but not styled
* Delete - renders but not styled
* Edit - renders but not styled
* Update - renders but not styled
* New - renders but not styled

# Nav
* renders but not styled

# Seed Data
* needs file clean up for line return
	- remove <hr>
	- move returns after commas
	- add anonymous user

# Other
* need to add authorization per function

"carrots"

const target = input

let query = `{ ingredients: { $regex: /${target}/ } }`

"{ ingredients: { $regex: /" + "/ } }`"/ } }`


{ ingredients: { $regex: /?/ } } +
{ instructions: { $regex: /?/ } }

let query = {
	ingredient: { $regex: /${target}/ },
	instructions: { $regex: /${target}/ }
}


find(query)

if from recipe link
	set query object to null
	find()
else we must be from search
	build query object
	let query = {
		ingredient: req.body.search,
		instructions: reg.body.search,
	}	
	find(query)
end if


search button /?origin=search


if req.query.origin == search









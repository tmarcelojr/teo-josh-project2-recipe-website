# Recipe Site

# Description

This recipe website is a forum for the public to discover recipes. An account is not required. The recipes are provided by registered users who create and save recipes. Registered users can interact with each other by comments and recipe ratings. 

## User Stories
### Account
* User can register an account
* User can edit this account when logged in
* When deleting account user can decide to delete their Recipes, Comments, and/or Ratings. If they choose to leave any of these then they can choose to leave their name attached to them or be listed as “Inactive user”	
* User will have a profile link on the navbar
* Users can click on a user’s name to show the User’s profile
* Users will be able to see the recipes of the User in their profile
* Users will be able to see how many comments and rating recipe has
### Create recipes - (requires User logged in)
* User can add recipes
* User will see a form to add title, picture, description, instructions
### Edit recipe - (requires User logged in and authorized)
* User will see a form to edit their recipe similar to add form
* User can edit own recipes
* User can edit or delete their own recipe on recipe home page
### Delete recipe (requires User logged in and authorized)
* User can delete own recipes
* User will have a button to delete recipe
* User will be prompted if deletion is certain
### Show recipe
* User can see photo, ingredients, instructions, ratings, and comments in a single view.
* User can rate recipes 1 - 5 stars (requires login)
### View recipes
* User can view all recipes on recipe home page
* User can click on a recipe to open a new page with that recipe
* User can filter the recipe homepage to list or view a certain way
* Users will be able to see rating and comments on the recipes
### Recipe Comments - (requires User logged in)
* User can add comments to any recipe
* User can edit own comments
* User can delete own comments
* User can like other User’s comments
* Users can attach photos to their comments
* Users will be able to see comments on the individual recipe page
* Users will be able to click on the User that created the recipe and go to the user's profile.

## Models
```
Recipe {
	name: String,
	description: String,
	category: String,
	ingredients[ ingredientSchema ],
	instructions: String,
	imageUrl: String,
	creator: { type: Schema.Types.ObjectId, ref: 'User' } ,
	comments: [ commentSchema ],
	dateCreated: Date
}

Ingredient {
	name: String,
	amount: String
}

Comment {
	text: String,
	rating: Number,
	date: Date,
	imageUrl: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' }
}

User {
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	imageUrl: String,
	location: String, 
	socialLinks: [ Strings ],
	emailAddress: String
}
```

## Wireframes

![Recipe home page](https://i.imgur.com/vglWXPx.jpg?1)
### Recipe Home Page 
* Search bar and popular recipes being displayed

![Recipe index page](https://i.imgur.com/6ruy3F3.jpg)
### Recipe Index Page 
* Displays recipes in order of highest rated
* Top of page will have filter box for recipe display

![Recipe show page](https://i.imgur.com/fz4D8uv.jpg)
### Recipe Top of Show Page 
* Top of page displays recipe name and rating
* A big picture of recipe will be displayed

![Recipe show page 2](https://i.imgur.com/QmZNBfb.jpg)
### Recipe Bottom of Show Page 
* Ingredients will be displayed under recipe photo
* Instructions will be under ingredients
* User comments will be displayed after instructions
* Logged in Users can add comment at the bottom of page

![Comment Box](https://i.imgur.com/o75wQTq.jpg)
### Comment Box
* Created comment with any attached photos will be displayed
* Creator of comment will be displayed - linkable to their profile
* Logged in users can delete and edit their own comment

![Add comment](https://i.imgur.com/zyVM9y2.jpg)
### Add comment 
* Logged in users can type comments in the textarea
* Ratings will be at the bottom left
* User can attach picture with their comment

![User Page]( https://i.imgur.com/57Omhon.jpg)
### User Page SHOW/EDIT/DELETE
* Profile page of registered users displaying their recipes on the left
* User's demographics will be located inside a box to the right displaying info and user photo
* Logged in user will be able to edit demographics and delete account inside user profile box






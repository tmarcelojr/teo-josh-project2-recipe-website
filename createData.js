require('dotenv').config()
// 1. Require your node modules
const mongoose = require('mongoose')

// 2. Require your model (and possibly your extra data source);
const User = require('./models/user.js')
const Recipe = require('./models/recipe.js')

// 3. Connect your database and collection name
const userData = require('./data/user.js')
const recipeData1 = require('./data/recipeSeed1.js')
const recipeData2 = require('./data/recipeSeed2.js')

const connectionString = process.env.MONGODB_URI

// 4. Open your mongoose connection
mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

console.log('this is our connectrion str', connectionString);

mongoose.connection.on('connected', () => {
	console.log('Server is connected');
})

mongoose.connection.on('disconnected', () => {
	console.log('Server is disconnected');
})

mongoose.connection.on('error', (err) => {
	console.log('\nThere was an error connecting.');
	console.log(err);
})

async function seedUsers(){
	try {
		const createdUsers = await User.insertMany(userData)
		const users = await User.find()
		console.log("created users", users)
		seedRecipes(users)				
	
	} catch(err) {
		console.log("this is the error", err)
	}
}

// async function seedRecipes(norman){
// 	try {
// 		for (let i = recipeData1.length - 1; i >= 0; i--) {
// 			const recipeSeed = {
// 				name: recipeData1[i].name,
// 				category: recipeData1[i].tags.join(),
// 				ingredients: recipeData1[i].ingredients.join(),
// 				instructions: recipeData1[i].instructions,	
// 				creator: norman[0]._id
// 			}

// 			const createdRecipe = await Recipe.create(recipeSeed)
// 			// mongoose.connection.close();
// 		}
	
// 	} catch(err) {
// 		console.log("this is the error", err)
// 	}
// }

async function seedRecipes(users){
	console.log("in seed recipes")
	try {
		const recipes = recipeData2.recipe
		for (let r = recipes.length - 1; r >= 0; r--) {
			let userNum = Math.floor(Math.random() * Math.floor(9));	

			//loop tags
			let category = ''
			for (let i = 0; i < recipes[r].tag.length; i++) {	
				category += recipes[r].tag[i] + ',\n'
			}			

			//loop ingredient
			console.log("recipe name is ",recipes[r].name )
			console.log("loop ingredients")
			let ingredients = ""
			for (let i = 0; i < recipes[r].ingredient.length; i++) {
				let ingredient = ''
				ingredient = recipes[r].ingredient[i].amount + ' ' + recipes[r].ingredient[i].unit + ' ' + recipes[r].ingredient[i].name
				ingredients += ingredient + ',\n'
			}
			console.log("ingredients after ingredient loop", ingredients)

			//loop ingredient Group
			console.log("recipe is ", recipes[r].name)
			if(recipes[r].hasOwnProperty('ingredientGroup')){
				console.log("recipe has ingredientGroup")
			}
			if(recipes[r].ingredientGroup.hasOwnProperty('ingredient')){
				console.log("recipe has ingredient")
			}


			console.log("loop ingredientGroup")
			if (!Array.isArray(recipes[r].ingredientGroup) || !recipes[r].ingredientGroup.length){
				if (!Array.isArray(recipes[r].ingredientGroup.ingredient) || !recipes[r].ingredientGroup.ingredient.length) {
					console.log("in ingredientGroup loop")
					for (let i = 0; i < recipes[r].ingredientGroup.ingredient.length; i++) {
						let ingredient = ''
						ingredient = recipes[r].ingredientGroup.ingredient[i].amount + ' ' + recipes[r].ingredientGroup.ingredient[i].unit + ' ' + recipes[r].ingredientGroup.ingredient[i].name
						ingredients += ingredient + ',\n'
					}
				}
			}				
			
			console.log("ingredients after ingredientGroup loop", ingredients)
			//loop instructions
			let instructions = ""
			for (let i = 0; i < recipes[r].step.length; i++) {	
				instructions += recipes[r].step[i].description + '\n'
			}

			const recipeSeed = {
				name: recipes[r].name,
				description: recipes[r].description,
				imageUrl: recipes[r].image,
				category: category,
				ingredients: ingredients,
				instructions: instructions,
				// get random user to assign to recipe
				creator: users[userNum]._id
			}
			console.log("here is a recipe", recipeSeed)
			const createdRecipe = await Recipe.create(recipeSeed)
			// mongoose.connection.close();
		}
	
	} catch(err) {
		console.log("this is the error", err)
	}
}

seedUsers()

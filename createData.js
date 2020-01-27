require('dotenv').config()
// 1. Require your node modules
const mongoose = require('mongoose')

// 2. Require your model (and possibly your extra data source);
const User = require('./models/user.js')
const Recipe = require('./models/recipe.js')

// 3. Connect your database and collection name
const userData = require('./data/user.js')
const recipeData1 = require('./data/recipeSeed1.js')

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
		const norman = await User.find({ username: "pn" })

		seedRecipes(norman)				
	
	} catch(err) {
		console.log("this is the error", err)
	}
}

async function seedRecipes(norman){
	try {
		for (let i = recipeData1.length - 1; i >= 0; i--) {
			const recipeSeed = {
				name: recipeData1[i].name,
				category: recipeData1[i].tags.join(),
				ingredients: recipeData1[i].ingredients.join(),
				instructions: recipeData1[i].instructions,	
				creator: norman[0]._id
			}

			const createdRecipe = await Recipe.create(recipeSeed)
			mongoose.connection.close();
		}
	
	} catch(err) {
		console.log("this is the error", err)
	}
}

seedUsers()

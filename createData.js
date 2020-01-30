require('dotenv').config()
// 1. Require your node modules
const mongoose = require('mongoose')

// 2. Require your model (and possibly your extra data source);
const User = require('./models/user.js')
const Recipe = require('./models/recipe.js')
const Comment = require('./models/comment.js')

// 3. Connect your database and collection name
const userData = require('./data/user.js')
const recipeData1 = require('./data/recipeSeed1.js')
const commentData = require('./data/commentSeed.js')

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

		seedRecipes(users)	
		// seedComments(users)			
	
	} catch(err) {
		console.log("this is the error", err)
	}
}

async function seedRecipes(users){
	try {
		for (let i = recipeData1.length - 1; i >= 0; i--) {
			let userNum = Math.floor(Math.random() * Math.floor(9));
			const recipeSeed = {
				name: recipeData1[i].name,
				imageUrl: recipeData1[i].ourimg,
				category: recipeData1[i].tags.join(),
				ingredients: recipeData1[i].ingredients.join(),
				instructions: recipeData1[i].instructions,	
				creator: users[userNum]._id
			}

			const createdRecipe = await Recipe.create(recipeSeed)

			let rating = Math.floor(Math.random() * Math.floor(5));
		    const createdComment = await Comment.create({
		      text: recipeData1[i].comments,
		      rating: rating,
		      author: users[userNum]._id
		    })
		    console.log("this is a comment", createdComment)

		    createdRecipe.comments.push(createdComment)
			//create more comments for rating
			const commentArray = [
				{ comment: "yum", rating: 5},
				{ comment: "pretty good", rating: 4},
				{ comment: "it's just OK", rating: 3},
				{ comment: "Not sure I'd make it again", rating: 2},
				{ comment: "Yuck", rating: 1},
				{ comment: "", rating: 0}
				]
			
			for (let i = 0; i < 3; i++) {
				let randomcomment = Math.floor(Math.random() * Math.floor(4));
				let userNum2 = Math.floor(Math.random() * Math.floor(9));

				let createdComment2 = await Comment.create({
			      text: commentArray[randomcomment].comment,
			      rating: commentArray[randomcomment].rating,
			      author: users[userNum2]._id
			    })
			    createdRecipe.comments.push(createdComment2)
			}	
	    	await createdRecipe.save()
	    	// console.log("this is the recipe with comment", createdRecipe )
			// mongoose.connection.close();
		}

		// Update recipes that don't have image with placeholder image.
		const updatedRecipes = await Recipe.updateMany({"imageUrl": {"$exists": false}}, {"$set": {"imageUrl": "http://via.placeholder.com/300/AED6F1/D6EAF8?text=image%20unavailable"}})
		


	} catch(err) {
		console.log("this is the error", err)
	}
}

// async function seedComments(users){
// 	try {
//     const foundRecipes = await Recipe.find()
//     console.log("in seedComments")
//     console.log("this is commentData length", commentData.length)
//     console.log("this is commentData", commentData)

//     for (let i = 0; i < commentData.length; i++) {
//     	console.log("in comment loop")
//     	let userNum = Math.floor(Math.random() * Math.floor(9));
//     	console.log("this is the usernum", userNum)


// 	    console.log("this is the comment", createdComment)
//     	let recipeNum = Math.floor(Math.random() * Math.floor(foundRecipes.length))
// 	    foundRecipes[recipeNum].comments.push(createdComment)
// 	    await foundRecipe[recipeNum].save()
// 	    console.log("this is the recipe with comment", foundRecipe[recipeNum] )
//     }

//   } catch(err) {
//     next(err)
//   }
// }

seedUsers()
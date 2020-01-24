require('dotenv').config()
// 1. Require your node modules
const mongoose = require('mongoose')

// 2. Require your model (and possibly your extra data source);
const User = require('./models/user.js')

// 3. Connect your database and collection name
const userData = require('./data/user.js')

console.log('this is our user', User);
console.log('this is our user data', userData);

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


User.insertMany(userData, (err, data) => {
  console.log("added user data")
  // mongoose.connection.close();
});
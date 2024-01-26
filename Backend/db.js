const mongoose = require('mongoose');
require("dotenv").config()
const mongoURI = "mongodb+srv://mayankkumar4x:champ123@cluster0.jsfnlcr.mongodb.net"; // Replace 'yourDatabaseName' with the actual name of your database
// const mongoURI = "mongodb://127.0.0.1:27017"; // Replace 'yourDatabaseName' with the actual name of your database
console.log(mongoURI)
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
        // useCreateIndex: true,  // This option is recommended for avoiding deprecation warnings
        // useFindAndModify: false,     
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongo;

const mongoose = require('mongoose')
require('dotenv').config();
const dbURI = process.env.DATABASE_URI; 

const connectDB = async () => { 
    try { 
await mongoose.connect(dbURI, // gets the string from the .env 
    {
      useNewUrlParser: true
    } ) 
} 
catch(err) {
    console.log(err)
} }   
module.exports = connectDB; 
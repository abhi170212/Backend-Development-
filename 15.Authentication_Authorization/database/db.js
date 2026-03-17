require('dotenv').config();
const url= process.env.DB_URL;
const mongoose = require('mongoose');

const connectDB = async() =>{
     mongoose.connect(url).then(()=>{
          console.log('DB connected successfully');
     }).catch(()=>{
          console.log(`Error at connection of db`)
          process.exit(1);
     })
}

module.exports = connectDB;
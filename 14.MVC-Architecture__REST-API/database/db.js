require('dotenv').config();
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;

//-------------------------------------------------------------------
//db connection function

const connectDb = async()=>{
     try{
          await mongoose.connect(dbUrl);
          console.log('MongoDb is connected successfully');
     }catch(err){
          console.log('MongoDb failed',err)
          process.exit(1);
     }
}
//----------------------------------------------------------------------
// common js export system(default yahi hot hai)
module.exports = connectDb;
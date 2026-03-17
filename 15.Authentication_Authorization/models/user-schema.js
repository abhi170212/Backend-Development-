const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase:true
    },

    email:{
      type: String,
      unique: true,
      required: [true, "E Mail is Must to login"],
      trim:true,
      lowercase:true
    },

    password:{
     type:String,
     required:[true,'Enter a password for sign up'],
     trim:true
    },
    role:{
     type:String,
     enum:['user','admin'], // only allowed admin and user,
     default:'user'
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model('User',userSchema);
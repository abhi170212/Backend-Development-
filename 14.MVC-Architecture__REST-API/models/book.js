const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title:{
     type:String,
     required:[true,'Book title is compulsory'],
     trim:true,
     maxLength:[100,'Book title can not be more than 100 characters']
    },
author:{
     type: String,
     required:[true,'Author name is required'],
     trim:true,
    },
    year:{
     type:Number,
     required:[true,'Publication year is required'],
     min:[1000,'year must be atleast 1000'],
     max:[new Date().getFullYear(),'year can not be in the future']
    },
    createdAt:{
     type:Date,
     default:Date.now()
    }
})

module.exports = mongoose.model('Book',schema);
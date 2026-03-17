const user = require('../models/user-schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret=process.env.JWT_SECRET;

//-----------------------------------------------------------------------------------------------
//register
const registeruser=async(req,res)=>{
     try{
          // extract information 
          const {username,email,password,role} = req.body;
          // cross checking -> agar user already ho to?
          const checkExistingUser = await user.findOne({$or:[{username},{email}]});
          if(checkExistingUser){
               return res.status(400).json({
                    message:'user already exists',
                    success:false,
                    error:null
               })
          }

          // hashing of password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password,salt);
          // alternative ->> const hashedPassword = await bcrypt.hash(password,10)

          // create a new user and save in DB
          const newCreatedUser = new user({
               username:username,
               password:hashedPassword,
               email:email,
               role:role
          })
          newCreatedUser.save();


          if(newCreatedUser){
               return res.status(200).json({
                    message:'New User connected successfully',
                    error:null,
                    success:true,
               })
          }

     }
     catch(err){
          console.log("Error at the register---> "+err);
          return res.status(500).json({
               message:'Something went wrong',
               error:err,
               success:false,
          })
     }
} 

//---------------------------------------------------------------------------------------

//login
const loginUser=async(req,res)=>{
     try{
           const {username,password} = req.body;
           const userExists = await user.findOne({username});

           if(!userExists){
               return res.status(400).json({
                    message:'user does not exists in the DataBase',
                    success:false,
               })
           }

           // password checking 
           const isPasswordMatch=await bcrypt.compare(password,userExists.password);
           if(!isPasswordMatch){
               return res.status(400).json({
                    message:'Password does not match,try another time!',
                    success:false,
               })
           }

           //token generation
           const accessToken = jwt.sign({
               userId:userExists._id,
               username:userExists.username,
               role:userExists.role
           },jwtSecret,{
               expiresIn:'15m'
           }); 
           return res.status(200).json({
               success:true,
               message:'Login Successful',
               data:accessToken
           })


     }
     catch(err){
          console.log("Error at the login---> "+err);
          return res.status(500).json({
               message:'Something went wrong',
               error:err,
               success:false,
          })
     }
}

module.exports = {loginUser,registeruser};
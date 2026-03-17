const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware.js');
const router= express.Router();
router.get('/main',authMiddleware,(req,res)=>{
   const {username,role,userId} = req.body;

     res.json({
          message:'Welcome To The Home Page',
          user:{
               _id:userId,
               user:username,
               role:role
          }
     })
})

module.exports = router;

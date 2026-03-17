const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret=process.env.JWT_SECRET;

//-------------------------------------------------------------------------------

const authMiddleware = (req, res, next) => {
     const authHeader = req.headers['authorization'];
     // console.log(authHeader);
     const token = authHeader && authHeader.split(" ")[1];
     if(!token){
          return res.status(401).json({
               message:`Access denied , no token found`,
               success:false
          })
     }

     //decode this token 
     try{
          const decodedTokenInfo = jwt.verify(token,jwtSecret);
          console.log(decodedTokenInfo);
          req.body=decodedTokenInfo; // idhar se ab routes me jaa kar nikal lena data ko 
          next();
     }catch(err){
          return res.status(401).json({
               message:`Access denied , no token found`,
               success:false
          })
     }

};

//---------------------------------------------------------------------------------------------
module.exports = authMiddleware;

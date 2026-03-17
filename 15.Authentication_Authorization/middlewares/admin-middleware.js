
const isAdminUser = (req,res,next) =>{

     if(req.body.role !== 'admin'){
          return res.status(402).json({
               success:false,
               message:`Access denied! Admin rights are required.`
          });
     }
     next();
}

module.exports = isAdminUser;
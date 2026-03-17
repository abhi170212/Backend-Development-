const express = require("express");
const authMiddleware=require('../middlewares/auth-middleware.js');
const adminMiddleWare=require('../middlewares/admin-middleware.js');
const router = express.Router();


//-------------------------------------------------------------------------
router.get("/welcome", authMiddleware, adminMiddleWare ,(req, res) => {
  res.json({
     message:`This is the admin`,
  })
});

//---------------------------------------------------------------------------
module.exports = router;

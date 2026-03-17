const express = require('express');
const router=express.Router();

// import them 
const {loginUser,registeruser} = require('../controllers/auth-controller');

// all routes are auth routes 
router.post('/register',registeruser);
router.post('/login',loginUser);


module.exports = router;
const express = require('express');
require('dotenv').config();
const app = express();
const db= require('./database/db');
const authRoutes=require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes.js');
const adminRoutes = require('./routes/admin-routes.js');


//---------------------------------------------------------------------
app.use(express.json()); // middleware
db(); // db connection
app.use('/api/auth-v1',authRoutes); // ye routes hai 
app.use('/api/home-v1',homeRoutes)
app.use('/api/admin-v1',adminRoutes)


//---------------------------------------------------------------------
// explore what is CCM Control 
//---------------------------------------------------------------------
const port = process.env.PORT || 3003;
app.listen(port,()=>{
     console.log(`App is running at port ${port}`);
})
//----------------------------------------------------------------------
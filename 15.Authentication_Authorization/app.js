const express = require('express');
// require('dotenv').config();
const app = express();
const db= require('./database/db');


app.use(express.json());
db();

const port = process.env.PORT || 3003;
app.listen(port,()=>{
     console.log(`App is running at port ${port}`);
})
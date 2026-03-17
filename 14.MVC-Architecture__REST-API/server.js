require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3003
const bookStoreApi = require('./routes/book-route');
// db calling ----------------------------
// this is called as common js ( default one in Nodejs )
const connectDb = require('./database/db')

//-------------------------------------------------------------------
//connect to DB
connectDb();
//--------------------------------------------------------------------

//middlewares
app.use(express.json());

//routes
app.use('/welcome',(req,res)=>{
     res.send('Hello world!');
})
app.use('/api/book-v1',bookStoreApi);
//--------------------------------------------------------------------

// app ka server on krne ka tarika 
app.listen(port,()=>{
     console.log(`Server is now running on port ${port}`);
})


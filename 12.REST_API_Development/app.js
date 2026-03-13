const express = require("express");
const app = express();

// middleware
app.use(express.json());

let books = [
  {
    id: "1",
    title: "Book 1",
  },
  {
    id: "2",
    title: "Book 2",
  },
  {
    id: "3",
    title: "Book 3",
  },
  {
    id: "4",
    title: "Book 4",
  },
];

//------------------------------------------------------------------------------------------------


// welcome message
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our boookstore api",
  });
});

//---------------------------------------------------------------------------------------------


// get all books
app.get("/get", (req, res) => {
  res.json(books);
});


//-----------------------------------------------------------------------------------------------


// get a single book
app.get("/get/:id", (req, res) => {
  const book = books.find((item) => item.id === req.params.id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: `Book is not avaibale, try different Book ID.`,
    });
  }
});

//---------------------------------------------------------------------------------------------


// add a new book 
app.post('/add',(request,response)=>{
    
     const newBook={
          // id:books.length+1,
          id:Math.floor(Math.random()*1000).toString(),
          title:`Book ${books.length+1}`
     }
     books.push(newBook);
     response.status(200).json({
          data:newBook,
          message:`New Book added successfully`
     })
})

//---------------------------------------------------------------------------------------------

//update a book 
app.put('/update/:id',(request,response)=>{
     const findCurrentBook = books.find(bookitem=>bookitem.id ===request.params.id);
     if(findCurrentBook){
          findCurrentBook.title= request.body.title || findCurrentBook.title;
          response.status(200).json({
               message:`Book with id ${findCurrentBook.id} updated sucessfully`,
          })
     }else{
          response.status(404).json({
               message:`Book with id ${findCurrentBook} is not aviable `,
          })

     }
});


//---------------------------------------------------------------------------------------------

//delete the book 
app.delete('/delete/:id',(request,response)=>{
     findId = request.params.id;
     const newBooksCollection = books.filter(book=>book.id !== findId );
     if(newBooksCollection.length === books.length ){
          return response.status(404).json({
               message:`There is no such book like that ! `,
               data:books
          })
     }
     books = newBooksCollection;
     response.status(200).json({
          message:`The Book is deleted successfully`,
          data:books
     })
})

//-------------------------------------------------------------------------------------------------

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port number ${PORT}`);
});


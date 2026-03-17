const Book = require("../models/book");

// isme CRUD operations honge

// READ--------------------------------------------------------------------------------
// READING ALL THE BOOKS --------------------------------------------------------------
const getAllBooks = async (req, res) => {
  try {
    const getAllBooks = await Book.find({});
    if (getAllBooks) {
      res.status(201).json({
        message: "All books are fetched",
        data: getAllBooks,
        success: true,
        error: null,
      });
    }
  } catch (err) {
    console.log("Error at fetching books,look at controller ->>> " + err);
    res.status(500).json({
      message: "Error happened at fetching books",
      data: null,
      error: true,
      success: false,
    });
  }
};
// READING SINGLE BOOK------------------------------------------------------------------------------------
const getSingleBookById = async (req, res) => {
  try {
    // const {id} = req.params; // Dono hi tareke se kr sakte hai
    const BookId = req.params.id;
    const bookInfo = await Book.find({ _id: BookId });
    if (bookInfo) {
      res.status(201).json({
        data: bookInfo,
        success: true,
        message: `book Fetched successfully`,
      });
    }
  } catch (err) {
    console.log("Error at fetching one books,look at controller ->>> " + err);
    res.status(500).json({
      message: "Error happened at fetching books",
      data: null,
      error: true,
      success: false,
    });
  }
};

// CREATE-----------------------------------------------------------------------------------------------------------
const addNewBook = async (req, res) => {
  try {
    const newBookInformation = req.body;
    const newBook = await Book.create(newBookInformation);
    if (newBook) {
      res.status(201).json({
        success: true,
        message: "Done Successfully",
        data: newBook,
        error: null,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
      error: err.message,
    });
  }
};

// UPDATE--------------------------------------------------------------------------------------------------------
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const dataFromBody = req.body;
    const updatedBook = await Book.findByIdAndUpdate(bookId, dataFromBody, {
      returnDocument: "after",
    });
    if (updatedBook) {
      return res.status(201).json({
        success: true,
        message: "Book Updated Successfully.",
        data: updatedBook,
        error: null,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during updation",
      data: null,
      error: err.message,
    });
  }
};

// DELETE --------------------------------------------------------------------------------------------------------
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);


    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
        error: "Invalid ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book Deleted Successfully.",
      data: deletedBook, 
      error: null,
    });

  } catch (err) {
     return res.status(500).json({
      success: false,
      message: "Something went wrong during deletion",
      data: null,
      error: err.message,
    });
  }
};

//------------------------------------------------------------------------------------------------------
// Exporting the controllers as named exports
module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
};

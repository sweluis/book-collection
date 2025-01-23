import { getAllBooksFromDB, getBooksByRatingFromDB, getBooksByReadStatusFromDB, addNewBookInDB, updateReadStatusInDB, deleteBookInDB } from "../services/bookService.js";

// Method to get all books from the database
export const getBookCollection = async (req, res, next) => {
    try {
        const allBooks = await getAllBooksFromDB();
        res.status(200).json(allBooks);
      } catch (error) {
        error.status = 500;
        error.message = 'Error fetching books; ', error.message;
        next(error);
      }
}

// Method to get all books from the database, sorted by high to low or vice versa, based on parameter passed
export const getBookCollectionByRating = async (req, res, next) => {
    try {
        let { order } = req.params;
        const orderDBInput = (order === 'high') ? 'DESC' : 'ASC';
        const books = await getBooksByRatingFromDB(orderDBInput);
        res.status(200).json(books);
    } catch (error) {
      error.status = 500;
      error.message = 'Error fetching books; ', error.message;
      next(error);
    }
}

// Method to get all books from the database, based on read status, controlled by parameter passed
export const getBookCollectionByReadStatus = async (req, res, next) => {
  try {
      let { status } = req.params;
      const statusDBInput = (status === 'true') ? 'TRUE' : 'FALSE';
      const books = await getBooksByReadStatusFromDB(statusDBInput);
      res.status(200).json(books);
  } catch (error) {
    error.status = 500;
    error.message = 'Error fetching books; ', error.message;
    next(error);
  }
}

// Method to add a new book to the database
export const addNewBook = async (req, res, next) => {
  try {
    const { title, rating } = req.body;
    if(!title || !rating) {
      throw new Error('Missing required data fields: title, rating');
    }
    await addNewBookInDB(req.body);
    res.status(201).send("Book added to collection.");
  } catch (error) {
    error.status = 400;
    next(error);
  }
}

// Method to update the read status of a book in the database
export const updateReadStatus = async (req, res, next) => {
  try {
    const { title } = req.body;
    if(!title) {
      throw new Error('Missing required data field: title');
    }
    await updateReadStatusInDB(req.body);
    res.send(`Book with ${req.body.title} has updated to read`);
  } catch (error) {
    error.status = 400;
    next(error);
  }
}

// Method to delete a book from the database
export const deleteBook = async (req, res, next) => {
  try {
    const { title } = req.body;
    if(!title) {
      throw new Error('Missing required data field: title');
    }
    await deleteBookInDB(req.body);
    res.send(`Book with ${req.body.title} has been removed from collection`);
  } catch (error) {
    error.status = 400;
    next(error);
  }
}
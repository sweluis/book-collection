import { getAllBooksFromDB, getBooksByRatingFromDB, getBooksByReadStatusFromDB, addNewBookInDB, updateReadStatusInDB, deleteBookInDB } from "../service/bookService.js";

export const getBookCollection = async (req, res) => {
    try {
        const allBooks = await getAllBooksFromDB();
        res.status(200).json(allBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

export const getBookCollectionByRating = async (req, res) => {
    try {
        let { order } = req.params;
        const orderDBInput = (order === 'high') ? 'DESC' : 'ASC';
        const books = await getBooksByRatingFromDB(orderDBInput);
        res.status(200).json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(400).json({ message: 'Client Error' });
    }
}

export const getBookCollectionByReadStatus = async (req, res) => {
  try {
      let { status } = req.params;
      const statusDBInput = (status === 'true') ? 'TRUE' : 'FALSE';
      const books = await getBooksByReadStatusFromDB(statusDBInput);
      res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(400).json({ message: 'Client Error' });
  }
}

export const addNewBook = async (req, res) => {
  try {
    const { title, rating } = req.body;
    if(!title || !rating) {
      throw new Error('Missing required fields: title, rating');
    }
    await addNewBookInDB(req.body);
    res.status(201).send("Book added to collection.");
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(400).json({ message: 'Client Error' });
  }
}

export const updateReadStatus = async (req, res) => {
  try {
    const { title } = req.body;
    if(!title) {
      throw new Error('Missing required field: title');
    }
    await updateReadStatusInDB(req.body);
    res.send(`Book with ${req.body.title} has updated to read`);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(400).json({ message: 'Client Error' });
  }
}

export const deleteBook = async (req, res) => {
  try {
    const { title } = req.body;
    if(!title) {
      throw new Error('Missing required field: title');
    }
    await deleteBookInDB(req.body);
    res.send(`Book with ${req.body.title} has been removed from collection`);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(400).json({ message: 'Client Error' });
  }
}
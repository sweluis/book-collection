import express from 'express';
import { getBookCollection, getBookCollectionByRating, getBookCollectionByReadStatus, addNewBook, updateReadStatus, deleteBook } from '../controllers/bookController.js';

const bookRouter = express.Router();

bookRouter.get('/collection', getBookCollection);

bookRouter.get('/collection/rating/:order', getBookCollectionByRating);

bookRouter.get('/collection/read/:status', getBookCollectionByReadStatus);

bookRouter.post('/addbook', addNewBook);

bookRouter.patch('/readbook', updateReadStatus);

bookRouter.delete('/removebook', deleteBook);

export default bookRouter;
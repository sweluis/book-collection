import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, 
  application_name: 'book-collection-api'
});

export default pool;


// INSERT INTO books (title, author, read, rating) VALUES
// ('To Kill a Mockingbird', 'Harper Lee', true, 4.8),
// ('1984', 'George Orwell', false, 5.0),
// ('The Great Gatsby', 'F. Scott Fitzgerald', true, 4.3),
// ('Pride and Prejudice', 'Jane Austen', false, 0.5),
// ('The Catcher in the Rye', 'J.D. Salinger', true, 3.7),
// ('Moby Dick', 'Herman Melville', false, 2.8),
// ('War and Peace', 'Leo Tolstoy', true, 4.9),
// ('The Hobbit', 'J.R.R. Tolkien', false, 3.1),
// ('Crime and Punishment', 'Fyodor Dostoevsky', true, 4.5),
// ('Brave New World', 'Aldous Huxley', false, 2.3),
// ('The Road', 'Cormac McCarthy', true, 4.2),
// ('The Alchemist', 'Paulo Coelho', true, 4.6),
// ('Harry Potter and the Philosophers Stone', 'J.K. Rowling', true, 4.9),
// ('The Da Vinci Code', 'Dan Brown', false, 1.0),
// ('The Hunger Games', 'Suzanne Collins', true, 4.7);

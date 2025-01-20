import pool from '../db.js'; // Import pool from db.js

async function createNewTable() {
  try {
    const tableQuery = `CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(50) NOT NULL UNIQUE,
      author VARCHAR(50) DEFAULT N/A,
      read BOOLEAN NOT NULL DEFAULT FALSE,
      rating NUMERIC(2,1) CHECK (rating >= 0.0 AND rating <= 5.0) NOT NULL
    );`;

    const result = await pool.query(tableQuery);
    console.log('Table Created!');
  } catch (err) {
    console.error('Error:', err);
  }
}


export async function getAllBooksFromDB() {
  try {
    const query = `
    SELECT * FROM books
    ORDER BY id
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function getBooksByRatingFromDB(ratingOrder) {
  try {
    const query = `
    SELECT * FROM books
    ORDER BY rating ${ratingOrder}
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function getBooksByReadStatusFromDB(readStatus) {
  try {
    const query = `
    SELECT * FROM books
    WHERE read=${readStatus}
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function addNewBookInDB(book) {
  try {
    const query = `
      INSERT INTO books (title, author, read, rating)
      VALUES ($1, $2, $3, $4)`;
    await pool.query(query, [book.title, book.author, book.read, book.rating]);
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function updateReadStatusInDB(bookName) {
  try {
    const query = `
    UPDATE books
    SET read=true
    WHERE title=$1
    `;
    await pool.query(query, [bookName.title]);
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function deleteBookInDB(bookName) {
  try {
    const query = `
    DELETE FROM books 
    WHERE title=$1;
    `;
    await pool.query(query, [bookName.title]);
  } catch (err) {
    console.error('Error:', err);
  }
}


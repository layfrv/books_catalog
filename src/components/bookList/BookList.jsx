import React, { useContext } from 'react';
import './bookList.scss';
import BookCard from '../bookCard/BookCard';
import { BooksContext } from '../../Context';

export const BookList = () => {
  const { books } = useContext(BooksContext);

  const selectBooks = (data) => {
    const booksByYear = [];
    const booksWithoutYear = [];

    for (const book of data) {
      if (book.year) {
        const existingYear = booksByYear.find((item) => item.year === book.year);
        if (existingYear) {
          existingYear.books.push(book);
        } else {
          booksByYear.push({
            year: book.year,
            books: [book],
          });
        }
      } else {
        booksWithoutYear.push(book);
      }
    }

    // Добавляем отдельную группу с книгами без указанного года
    if (booksWithoutYear.length > 0) {
      booksByYear.push({
        year: null,
        books: booksWithoutYear,
      });
    }

    return booksByYear;
  };

  const arrayOfBooks = selectBooks(books);

  return (
    <div className='book-list-container'>
      {arrayOfBooks.map(({ books, year }, index) => (
        <div key={index}>
          {year === null ? <h2>Дата издания неизвестна</h2> : <h2>{year}</h2>}
          <div className='book-list'>
            {books.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

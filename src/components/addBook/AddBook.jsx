import React, { useEffect, useState } from 'react';
import './addBook.scss';
import noCover from '../../assets/no-cover.svg';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firestore/firestoreConfig';
import { isValid } from 'isbn-utils';

const createId = () => {
  let id = Math.floor(Math.random() * 100000);
  return id;
};

const AddBook = () => {
  const [succesAddModal, setSuccesAddModal] = useState(false);
  const [errorAddModal, setErrorAddModal] = useState(false);
  const [errorIsbn, setErrorIsbn] = useState(false);

  const [book, setBook] = useState({
    name: '',
    authors: '',
    year: '',
    rating: '',
    isbn: '',
    imageUrl: '',
    id: '',
  });

  useEffect(() => {
    if (isValid(book.isbn)) {
      setBook({ ...book, isbn: book.isbn });
      setErrorIsbn(false);
    } else {
      setErrorIsbn(true);
    }

    if (book.isbn === 0 || book.isbn === '') {
      setErrorIsbn(false);
    }
  }, [book.isbn]);

  const succesModalHandler = () => {
    setSuccesAddModal(true);
    setTimeout(() => {
      setSuccesAddModal(false);
    }, 3000);
  };

  const errorModalHandler = () => {
    setErrorAddModal(true);
    setTimeout(() => {
      setErrorAddModal(false);
    }, 3000);
  };

  const nowDate = new Date().getFullYear();

  function handleNameAdd(event) {
    setBook({ ...book, name: event.target.value });
  }

  function handleAuthorsAdd(event) {
    setBook({ ...book, authors: event.target.value });
  }

  function handleYearAdd(event) {
    setBook({ ...book, year: Number(event.target.value) });
  }

  function handleRatingAdd(event) {
    setBook({ ...book, rating: Number(event.target.value) });
  }

  function handleIsbnAdd(event) {
    setBook({ ...book, isbn: event.target.value });
  }

  function handleImageUrlAdd(event) {
    setBook({
      ...book,
      imageUrl: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, 'books'), {
        name: book.name.trim(),
        authors: book.authors.trim(),
        rating: book.rating,
        id: createId(),
        year: book.year,
        isbn: book.isbn,
        imageUrl: book.imageUrl !== '' ? book.imageUrl : noCover,
      });

      setBook({ name: '', authors: '', year: '', rating: '', isbn: '', imageUrl: '', id: '' });
      succesModalHandler();
    } catch (error) {
      errorModalHandler();
      console.log('Error adding object:', error);
    }
  };

  return (
    <>
      {succesAddModal && (
        <div className='addedModal' style={{ backgroundColor: '#009d2d' }}>
          <p>Книга успешно добавлена!</p>
        </div>
      )}
      {errorAddModal && (
        <div className='addedModal' style={{ backgroundColor: '#5f6260' }}>
          <p>Ошибка при добавлении книги</p>
        </div>
      )}

      <div className='wrap'>
        <form onSubmit={handleSubmit} className='form'>
          <h1 className='title'>Добавить книгу</h1>
          <input
            type='text'
            placeholder='Название книги'
            value={book.name}
            maxLength={100}
            onChange={handleNameAdd}
            required
          />
          <input
            type='text'
            value={book.authors}
            onChange={handleAuthorsAdd}
            placeholder='Автор'
            required
          />
          <input
            type='number'
            value={book.year === 0 ? '' : book.year}
            min={1800}
            max={nowDate}
            maxLength={4}
            onChange={handleYearAdd}
            placeholder='Год издания'
          />
          <input
            type='number'
            value={book.rating === 0 ? '' : book.rating}
            max={5}
            maxLength={1}
            onChange={handleRatingAdd}
            placeholder='Рейтинг от 1 до 5'
          />
          <input
            maxLength={17}
            type='text'
            value={book.isbn}
            onChange={handleIsbnAdd}
            placeholder='ISBN'
          />
          {book.isbn !== '' && book.isbn !== 0 && errorIsbn && (
            <span className='inputErrorIsbn'>Неправильный ISBN</span>
          )}
          <input
            type='url'
            value={book.imageUrl}
            onChange={handleImageUrlAdd}
            placeholder='Cсылка на изображение: https://...'
          />
          <button disabled={!book.name || !book.authors || errorIsbn} type='submit' className='btn'>
            Добавить книгу
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBook;

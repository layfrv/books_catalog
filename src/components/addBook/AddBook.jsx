import React, { useState } from 'react';
import './addBook.scss';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firestore/firestoreConfig';

const AddBook = () => {
  const [name, setName] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState(null);
  const [rating, setRating] = useState(null);
  const [isbn, setIsbn] = useState('');

  const nowDate = new Date().getFullYear();

  const imageUrl = 'https://e.nlrs.ru/imgs/covers/cover-removed-by-copyright.png';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'books'), {
        name,
        rating,
        year,
        authors,
        isbn,
        imageUrl,
      });

      setName('');
      setAuthors('');
      setYear('');
      setRating('');
      setIsbn('');

      console.log('Book added successfully.');
    } catch (error) {
      console.log('Error adding object:', error);
    }
  };

  return (
    <div className='wrap'>
      <form onSubmit={handleSubmit} className='form'>
        <h1 className='title'>Добавить книгу</h1>
        <input
          type='text'
          placeholder='Название книги'
          value={name}
          maxLength={100}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type='text'
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          placeholder='Автор'
          required
        />
        <input
          type='number'
          value={year}
          min={1800}
          max={nowDate}
          onChange={(e) => setYear(Number(e.target.value))}
          placeholder='Год издания'
        />
        <input
          type='number'
          value={rating}
          min={0}
          max={10}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder='Рейтинг от 0 до 10'
        />
        <input
          type='text'
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder='ISBN'
        />
        <button type='submit' className='btn'>
          Добавить книгу
        </button>
      </form>
    </div>
  );
};

export default AddBook;

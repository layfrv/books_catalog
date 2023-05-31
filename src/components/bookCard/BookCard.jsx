import React, { useContext, useState } from 'react';
import './bookCard.scss';
import star from '../../assets/star.svg';
import dltIcon from '../../assets/deleteIcon.svg';
import { DeleteContext } from '../../Context';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firestore/firestoreConfig';

const BookCard = ({ book }) => {
  const { isActiveDeleteBtn } = useContext(DeleteContext);

  const documentId = book.id;

  const deleteBook = async () => {
    try {
      await deleteDoc(doc(db, 'books', documentId));
      console.log('Документ успешно удален');
    } catch (error) {
      console.error('Ошибка удаления документа:', error);
    }
  };

  return (
    <div className='book-card'>
      <div className='book-cover'>
        <img src={book.imageUrl} alt='book-cover'></img>
      </div>
      <div className='book-description'>
        <div className='rating-card'>
          {book.rating > 0 ? (
            [...Array(book.rating)].map((_, index) => (
              <img className='star' key={index} src={star} alt='star' />
            ))
          ) : (
            <p>рейтинг неизвестен</p>
          )}
        </div>
        <h3>{book.name}</h3>
        <p>Автор: {book.authors}</p>
        <p>Год публикации: {book.year}</p>
        <p>Рейтинг: {book.rating}</p>
        <p>ISBN: {book.isbn}</p>
      </div>
      {isActiveDeleteBtn && (
        <button className='dlt-btn' onClick={() => deleteBook()}>
          <img src={dltIcon} alt='delete-button' />
        </button>
      )}
    </div>
  );
};

export default BookCard;

import React, { useContext } from 'react';
import './bookCard.scss';
import star from '../../assets/star.svg';
import dltIcon from '../../assets/deleteIcon.svg';
import { DeleteContext } from '../../Context';

const BookCard = ({ book }) => {
  const { isActiveBtn } = useContext(DeleteContext);

  return (
    <div className='book-card'>
      <div className='book-cover'>
        <img src={book.imageUrl} alt='book-cover'></img>
      </div>
      <div className='book-description'>
        <div className='rating'>
          {[...Array(book.rating)].map((_, index) => (
            <img key={index} src={star} alt='star' />
          ))}
        </div>
        <h3>{book.name}</h3>
        <p>Автор: {book.authors}</p>
        <p>Год публикации: {book.year}</p>
        <p>Рейтинг: {book.rating}</p>
        <p>ISBN: {book.isbn}</p>
      </div>
      {isActiveBtn && (
        <div className='dlt-btn'>
          <img src={dltIcon} alt='delete-button' />
          <p>не сделано</p>
        </div>
      )}
    </div>
  );
};

export default BookCard;

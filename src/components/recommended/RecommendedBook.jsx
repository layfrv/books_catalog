import React, { useContext, useEffect, useState } from 'react';
import './recommended.scss';
import star from '../../assets/star.svg';
import { BooksContext } from '../../Context';

const RecommendedBook = () => {
  const [recommendedBook, setRecommendedBook] = useState(null);
  const { books } = useContext(BooksContext);

  useEffect(() => {
    const selectRecommendedBook = (data) => {
      const currentYear = new Date().getFullYear();
      const highestRating = data.map((b) => b).sort((a, b) => b.rating - a.rating)[0]?.rating || 0;

      const goodBooks = data.filter((b) => b.year - 3 < currentYear && b.rating === highestRating);

      const randomGoodBookIndex = Math.floor(Math.random() * goodBooks.length);

      return goodBooks[randomGoodBookIndex];
    };

    setRecommendedBook(selectRecommendedBook(books));
  }, []);

  return (
    <div className='recommended'>
      <h2>Рекомендуемая книга</h2>
      {recommendedBook && (
        <div className='card'>
          <div className='book-cover'>
            <img src={recommendedBook.imageUrl} alt='book' />
          </div>

          <div className='card-description'>
            <p className='title'>{recommendedBook.name}</p>
            <div className='rating'>
              {[...Array(recommendedBook.rating)].map((_, index) => (
                <img key={index} src={star} alt='star' />
              ))}
            </div>
            <p>Автор: {recommendedBook.authors}</p>
            <p>Год публикации: {recommendedBook.year}</p>
            <p>Рейтинг: {recommendedBook.rating}</p>
            <p>ISBN: {recommendedBook.isbn}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedBook;

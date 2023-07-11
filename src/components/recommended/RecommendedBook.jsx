import React, { useContext, useEffect, useState } from 'react';
import './recommended.scss';
import star from '../../assets/star.svg';
import { BooksContext } from '../../Context';

const RecommendedBook = () => {
  const [recommendedBook, setRecommendedBook] = useState(null);
  const { books } = useContext(BooksContext);

  useEffect(() => {
    const selectRecommendedBook = (data) => {
      const checkYear = new Date().getFullYear() - 3;

      const oldBooks = data.filter((a) => a.year < checkYear && a.year !== '');
      const highestRatingBook = oldBooks.sort((a, b) => a - b)[0];
      const maxRateBooks = [];
      oldBooks.forEach((el) => {
        if (el.rating === highestRatingBook.rating) {
          maxRateBooks.push(el);
        }
      });
      const randomGoodBookIndex = Math.floor(Math.random() * maxRateBooks.length);
      return maxRateBooks[randomGoodBookIndex];
    };
    setRecommendedBook(selectRecommendedBook(books));
  }, [books]);

  return (
    <div className='recommended-wrap'>
      <div className='recommended-block'>
        <h2>Рекомендуемая книга</h2>
        {recommendedBook && (
          <div className='card'>
            <div className='book-cover'>
              <img src={recommendedBook.imageUrl} alt='book' />
            </div>

            <div className='card-description'>
              <h3 className='book-title'>{recommendedBook.name}</h3>
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
    </div>
  );
};

export default RecommendedBook;

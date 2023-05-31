import React, { useState, useEffect } from 'react';
import './app.scss';
import { BrowserRouter } from 'react-router-dom';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { AppRouter } from './AppRouter';
import { db } from './firestore/firestoreConfig';
import { BooksContext, DeleteContext } from './Context';
import Footer from './components/footer/Footer';

import Header from './components/header/Header';
import Loader from './components/loader';

export const App = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isActiveDeleteBtn, setActiveDeleteBtn] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'books'), orderBy('year', 'desc'));
    const unsubscribe = onSnapshot(q, (docs) => {
      const newBooks = [];
      docs.forEach((doc) => {
        newBooks.push({ ...doc.data(), id: doc.id });
      });
      setBooks(newBooks);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <BrowserRouter>
      <DeleteContext.Provider value={{ isActiveDeleteBtn, setActiveDeleteBtn }}>
        <Header />
        {isLoading ? (
          <Loader />
        ) : (
          <BooksContext.Provider value={{ books, setBooks }}>
            <AppRouter />
          </BooksContext.Provider>
        )}
      </DeleteContext.Provider>
      <Footer />
    </BrowserRouter>
  );
};

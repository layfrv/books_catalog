import React from 'react';
import { Routes as BrowserRoutes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import AddPage from './pages/AddPage';
import NotFoundPage from './pages/AddPage';
import RecommendedPage from './pages/RecommendedPage';

export const AppRouter = () => {
  return (
    <BrowserRoutes>
      <Route path='/' element={<MainPage />} />
      <Route path='addbooks' element={<AddPage />} />
      <Route path='recommended-book' element={<RecommendedPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </BrowserRoutes>
  );
};

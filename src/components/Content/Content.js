import React, { lazy, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import ArticleTypes from '../ArticleTypes/ArticleTypes';
import Professions from '../Professions/Professions';
import Subjects from '../Subjects/Subjects';
// import PropTypes from 'prop-types';
// import styles from './Content.module.css';

const Teachers = lazy(() => import('../Teachers'));
const Articles = lazy(() => import('../Articles'));
const NotFound = lazy(() => import('../NotFound'));

const Content = (props) => {
  return (
    <Routes>
      <Route path='/' element={<Teachers />} />
      <Route path='teachers' element={<Teachers />} />
      <Route path='articles' element={<Articles />} />
      <Route path='professions' element={<Professions />} />
      <Route path='article-types' element={<ArticleTypes />} />
      <Route path='subjects' element={<Subjects />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

Content.propTypes = {};

export default memo(Content);

import React, { lazy, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styles from './Content.module.css';

const Teachers = lazy(() => import('../Teachers'));
const Works = lazy(() => import('../Works'));

const Content = (props) => {
  return (
    <Routes>
      <Route path='/' element={<Teachers />} />
      <Route path='teachers' element={<Teachers />} />
      <Route path='works' element={<Works />} />
    </Routes>
  );
};

Content.propTypes = {};

export default memo(Content);

import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Footer.module.css';

const Footer = (props) => {
  return (
    <p className={styles.p}>
      <b>&copy; 2022</b> | Created by Davud Haji & Murad Hajiyev
    </p>
  );
};

Footer.propTypes = {};

export default Footer;

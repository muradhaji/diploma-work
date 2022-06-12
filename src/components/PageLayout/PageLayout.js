import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './PageLayout.module.css';

const PageLayout = ({ buttons, content }) => {
  return (
    <div className={styles.container}>
      <div className={styles.button_holder}>{buttons}</div>
      <div className={[styles.content_holder, 'hide-scrollbar'].join(' ')}>
        {content}
      </div>
    </div>
  );
};

PageLayout.propTypes = {
  buttons: PropTypes.node,
  content: PropTypes.node,
};

PageLayout.defaultProps = {
  buttons: 'Buttons',
  content: 'Content',
};

export default memo(PageLayout);

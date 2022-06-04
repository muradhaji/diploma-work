import React, { memo } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

const Header = ({ collapsed, toggleCollapsed }) => {
  return (
    <div className={styles.inner}>
      <span className={styles.collapse_container} onClick={toggleCollapsed}>
        {collapsed ? (
          <MenuUnfoldOutlined className={styles.collapse_icon} />
        ) : (
          <MenuFoldOutlined className={styles.collapse_icon} />
        )}
      </span>
    </div>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool,
  toggleCollapsed: PropTypes.func,
};

export default memo(Header);

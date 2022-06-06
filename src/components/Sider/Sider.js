import { Menu } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TeamOutlined, FileOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './Sider.module.css';

const Sider = ({ collapsed }) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [menuSelectedKeys, setMenuSelectedKeys] = useState(['/teachers']);

  const menuItems = [
    { key: '/teachers', icon: <TeamOutlined />, label: 'Müəllimlər' },
    { key: '/works', icon: <FileOutlined />, label: 'Elmi işlər' },
  ];

  useEffect(() => {
    if (pathname === '/') {
      setMenuSelectedKeys(['/teachers']);
    } else {
      setMenuSelectedKeys([pathname]);
    }
  }, [pathname]);

  const onMenuSelect = (values) => {
    const { key = null, selectedKeys = [] } = values || {};
    if (key) {
      setMenuSelectedKeys(selectedKeys);
      navigate(key);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <b>{collapsed ? 'İS' : 'İNFORMASİYA SİSTEMİ'}</b>
      </div>
      <div className={styles.menu}>
        <Menu
          items={menuItems}
          theme='dark'
          onSelect={onMenuSelect}
          selectedKeys={menuSelectedKeys}
          defaultSelectedKeys={['teachers']}
        />
      </div>
    </div>
  );
};

Sider.propTypes = {
  collapsed: PropTypes.bool,
};

Sider.defaultProps = {
  collapsed: false,
};

export default memo(Sider);

import { Menu } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TeamOutlined, FileOutlined, SettingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './Sider.module.css';

const Sider = ({ collapsed }) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [menuSelectedKeys, setMenuSelectedKeys] = useState(['/teachers']);

  const menuItems = [
    { key: '/teachers', icon: <TeamOutlined />, label: 'Müəllimlər' },
    { key: '/articles', icon: <FileOutlined />, label: 'Məqalələr' },
    {
      key: '/professions',
      icon: <SettingOutlined />,
      label: 'İxtisaslar',
    },
    {
      key: '/article-types',
      icon: <SettingOutlined />,
      label: 'Məqalə tipləri',
    },
    {
      key: '/subjects',
      icon: <SettingOutlined />,
      label: 'Fənnlər',
    },
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

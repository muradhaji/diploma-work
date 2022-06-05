import React, { lazy, memo, useState } from 'react';
import { Layout as AntLayout } from 'antd';
// import PropTypes from 'prop-types';
import styles from './Layout.module.css';

const Sider = lazy(() => import('../Sider'));
const Header = lazy(() => import('../Header'));
const Content = lazy(() => import('../Content'));
const Footer = lazy(() => import('../Footer'));

const {
  Header: AntHeader,
  Content: AntContent,
  Footer: AntFooter,
  Sider: AntSider,
} = AntLayout;

const Layout = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <AntLayout className={styles.primary}>
      <AntSider className={styles.sider} collapsed={collapsed}>
        <Sider collapsed={collapsed} />
      </AntSider>
      <AntLayout className={styles.secondary}>
        <AntHeader className={styles.header}>
          <Header toggleCollapsed={toggleCollapsed} collapsed={collapsed} />
        </AntHeader>
        <AntContent className={[styles.content, 'hide-scrollbar'].join(' ')}>
          <Content />
        </AntContent>
        <AntFooter className={styles.footer}>
          <Footer />
        </AntFooter>
      </AntLayout>
    </AntLayout>
  );
};

Layout.propTypes = {};

export default memo(Layout);

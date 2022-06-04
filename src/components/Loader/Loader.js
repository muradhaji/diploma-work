import React, { memo } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './Loader.module.css';

const INDICATORS = {
  dots: 'default',
  circle: <LoadingOutlined />,
};

const Loader = ({
  children,
  spinning,
  fullScreen,
  centered,
  size,
  indicator,
  bg,
  color,
  content,
}) => {
  return (
    <div
      className={[
        styles.container,
        fullScreen && styles.full_screen,
        (centered || fullScreen || !children) && styles.centered,
        styles[size],
        styles[`bg_${bg}`],
        styles[`color_${color}`],
      ].join(' ')}
    >
      <Spin
        spinning={spinning}
        tip={content}
        size={size}
        indicator={INDICATORS[indicator]}
      >
        {children}
      </Spin>
    </div>
  );
};

Loader.propTypes = {
  spinning: PropTypes.bool,
  fullScreen: PropTypes.bool,
  centered: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  indicator: PropTypes.oneOf(['dots', 'circle']),
  bg: PropTypes.oneOf([
    'transparent',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ]),
  color: PropTypes.oneOf([
    'light',
    'dark',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ]),
  content: PropTypes.string,
};

Loader.defaultProps = {
  spinning: true,
  fullScreen: false,
  centered: false,
  size: 'default',
  indicator: 'circle',
  bg: 'transparent',
  color: '9',
  content: null,
};

export default memo(Loader);

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { find } from 'lodash';

const useModalStatus = (modalKey) => {
  const { modals = [] } = useSelector((state) => state) || {};

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const foundKey = find(modals, (key) => key === modalKey);
    setVisible(foundKey ? true : false);
    // eslint-disable-next-line
  }, [modals]);

  return visible;
};

useModalStatus.propTypes = {
  modalKey: PropTypes.string.isRequired,
};

export default useModalStatus;

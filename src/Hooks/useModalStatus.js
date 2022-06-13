import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { find } from 'lodash';
import { openModal, closeModal, toggleModal } from '../Redux/Slices/ModalSlice';

const useModalStatus = (modalKey) => {
  const { modals = [] } = useSelector((state) => state) || {};

  const dispatch = useDispatch();

  const toggleModalState = () => {
    dispatch(toggleModal(modalKey));
  };

  const showModal = () => {
    dispatch(openModal(modalKey));
  };

  const hideModal = () => {
    dispatch(closeModal(modalKey));
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const foundKey = find(modals, (key) => key === modalKey);
    setVisible(foundKey ? true : false);
    // eslint-disable-next-line
  }, [modals]);

  return { visible, showModal, hideModal, toggleModalState };
};

useModalStatus.propTypes = {
  modalKey: PropTypes.string.isRequired,
};

export default useModalStatus;

import { Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { deleteArticleType } from '../../../Redux/Slices/ArticleTypeSlice';
// import PropTypes from 'prop-types';
// import styles from './DeleteModal.module.css';

const CreateModal = ({ ArticleTypeSlice, deleteArticleType }) => {
  const { deleteLoading = false, selectedArticleType = null } =
    ArticleTypeSlice || {};

  const { id: selectedId = null, adi: selectedName = null } =
    selectedArticleType || {};

  const { visible = false, hideModal } = useModalStatus(
    MODALS.ARTICLE_TYPE_DELETE
  );

  const handleOk = () => {
    if (selectedId) {
      deleteArticleType(selectedId);
    }
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <Modal
      centered
      visible={visible}
      title='Məqalə tipini silmək'
      okText='Təsdiqlə'
      cancelText='Çıx'
      okButtonProps={{ loading: deleteLoading }}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      {`"${selectedName}" adlı məqalə tipini silmək istədiyinizdən əminsiniz?`}
    </Modal>
  );
};

CreateModal.propTypes = {};

const mapStateToProps = (state) => {
  const { articleTypes: ArticleTypeSlice = null } = state || {};
  return {
    ArticleTypeSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        deleteArticleType,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

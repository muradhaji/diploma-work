import { Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { deleteArticle } from '../../../Redux/Slices/ArticleSlice';
// import PropTypes from 'prop-types';
// import styles from './DeleteModal.module.css';

const CreateModal = ({ ArticleSlice, deleteArticle }) => {
  const { deleteLoading = false, selectedArticle = null } = ArticleSlice || {};

  const { id: selectedId = null, name: selectedName = null } =
    selectedArticle || {};

  const { visible = false, hideModal } = useModalStatus(MODALS.ARTICLE_DELETE);

  const handleOk = () => {
    if (selectedId) {
      deleteArticle(selectedId);
    }
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <Modal
      centered
      visible={visible}
      title='Silmək'
      okText='Təsdiqlə'
      cancelText='Çıx'
      okButtonProps={{ loading: deleteLoading }}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      {`"${selectedName}" adlı elmi tədqiqat işini silmək istədiyinizdən əminsiniz?`}
    </Modal>
  );
};

CreateModal.propTypes = {};

const mapStateToProps = (state) => {
  const { articles: ArticleSlice = null } = state || {};
  return {
    ArticleSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        deleteArticle,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

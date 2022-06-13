import { Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { deleteSubject } from '../../../Redux/Slices/SubjectSlice';
// import PropTypes from 'prop-types';
// import styles from './DeleteModal.module.css';

const CreateModal = ({ SubjectSlice, deleteSubject }) => {
  const { deleteLoading = false, selectedSubject = null } = SubjectSlice || {};

  const { id: selectedId = null, adi: selectedName = null } =
    selectedSubject || {};

  const { visible = false, hideModal } = useModalStatus(MODALS.SUBJECT_DELETE);

  const handleOk = () => {
    if (selectedId) {
      deleteSubject(selectedId);
    }
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <Modal
      centered
      visible={visible}
      title='Fənni silmək'
      okText='Təsdiqlə'
      cancelText='Çıx'
      okButtonProps={{ loading: deleteLoading }}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      {`"${selectedName}" adlı fənni silmək istədiyinizdən əminsiniz?`}
    </Modal>
  );
};

CreateModal.propTypes = {};

const mapStateToProps = (state) => {
  const { subjects: SubjectSlice = null } = state || {};
  return {
    SubjectSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        deleteSubject,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

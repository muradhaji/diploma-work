import { Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import { closeModal } from '../../../Redux/Slices/ModalSlice';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { deleteSubject } from '../../../Redux/Slices/SubjectSlice';
// import PropTypes from 'prop-types';
// import styles from './DeleteModal.module.css';

const CreateModal = ({ SubjectSlice, closeModal, deleteSubject }) => {
  const { deleteLoading, selectedSubject = null } = SubjectSlice || {};

  const { id: selectedId = null, adi: selectedName = null } =
    selectedSubject || {};

  const isVisible = useModalStatus(MODALS.SUBJECTS_DELETE);

  const handleOk = () => {
    if (selectedId) {
      // updateSubject(id, normalizeFilterData(form.getFieldsValue()));
      deleteSubject(selectedId);
    }
  };

  const handleCancel = () => {
    closeModal(MODALS.SUBJECTS_DELETE);
  };

  return (
    <Modal
      centered
      visible={isVisible}
      title='Fənni silmək'
      okText='Təsdiqlə'
      cancelText='Çıx'
      okButtonProps={{ loading: deleteLoading }}
      onOk={handleOk}
      onCancel={handleCancel}
      width='50%'
      // bodyStyle={{
      //   overflowY: 'scroll',
      //   height: 'calc(100vh -  210px)',
      // }}
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
        closeModal,
        deleteSubject,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

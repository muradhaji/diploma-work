import { Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { deleteTeacher } from '../../../Redux/Slices/TeacherSlice';
// import PropTypes from 'prop-types';
// import styles from './DeleteModal.module.css';

const CreateModal = ({ TeacherSlice, deleteTeacher }) => {
  const { deleteLoading = false, selectedTeacher = null } = TeacherSlice || {};

  const {
    id: selectedId = null,
    ad = '',
    soyad = '',
    ata_adi = '',
  } = selectedTeacher || {};

  const { visible = false, hideModal } = useModalStatus(MODALS.TEACHER_DELETE);

  const handleOk = () => {
    if (selectedId) {
      deleteTeacher(selectedId);
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
      {`"${ad} ${soyad} ${ata_adi}" adlı müəllimi silmək istədiyinizdən əminsiniz?`}
    </Modal>
  );
};

CreateModal.propTypes = {};

const mapStateToProps = (state) => {
  const { teachers: TeacherSlice = null } = state || {};
  return {
    TeacherSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        deleteTeacher,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

import { Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { deleteProfession } from '../../../Redux/Slices/ProfessionSlice';
// import PropTypes from 'prop-types';
// import styles from './DeleteModal.module.css';

const CreateModal = ({ ProfessionSlice, deleteProfession }) => {
  const { deleteLoading = false, selectedProfession = null } =
    ProfessionSlice || {};

  const { id: selectedId = null, ad: selectedName = null } =
    selectedProfession || {};

  const { visible = false, hideModal } = useModalStatus(
    MODALS.PROFESSION_DELETE
  );

  const handleOk = () => {
    if (selectedId) {
      deleteProfession(selectedId);
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
      {`"${selectedName}" adlı ixtisası silmək istədiyinizdən əminsiniz?`}
    </Modal>
  );
};

CreateModal.propTypes = {};

const mapStateToProps = (state) => {
  const { professions: ProfessionSlice = null } = state || {};
  return {
    ProfessionSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        deleteProfession,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

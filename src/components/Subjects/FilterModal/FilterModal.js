import { Form, Input, Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { getFilteredSubjectsData } from '../../../Redux/Slices/SubjectSlice';
// import PropTypes from 'prop-types';
// import styles from './FilterModal.module.css';

const FilterModal = ({ SubjectSlice, getFilteredSubjectsData }) => {
  const { loading: getFilteredSubjectsDataLoading = false } =
    SubjectSlice || {};

  const { visible = false, hideModal } = useModalStatus(MODALS.SUBJECT_FILTER);

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    getFilteredSubjectsData(normalizeFilterData(values));
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <Modal
      centered
      visible={visible}
      title='Filterləmək'
      okText='Təsdiqlə'
      cancelText='Çıx'
      okButtonProps={{
        loading: getFilteredSubjectsDataLoading,
        form: MODALS.SUBJECT_FILTER,
        htmlType: 'submit',
      }}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form form={form} name={MODALS.SUBJECT_FILTER} onFinish={handleFinish}>
        <Form.Item label='Ad' name='adi'>
          <Input autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  );
};

FilterModal.propTypes = {};

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
        getFilteredSubjectsData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(FilterModal));

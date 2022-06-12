import { Form, Input, Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import { closeModal } from '../../../Redux/Slices/ModalSlice';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { getSubjectsData } from '../../../Redux/Slices/SubjectSlice';
// import PropTypes from 'prop-types';
// import styles from './FilterModal.module.css';

const FilterModal = ({ SubjectSlice, closeModal, getSubjectsData }) => {
  const { loading: getSubjectsDataLoading } = SubjectSlice || {};

  const isVisible = useModalStatus(MODALS.SUBJECTS_FILTER);

  const [form] = Form.useForm();

  const handleOk = () => {
    getSubjectsData(normalizeFilterData(form.getFieldsValue()));
  };

  const handleCancel = () => {
    closeModal(MODALS.SUBJECTS_FILTER);
  };

  return (
    <Modal
      centered
      visible={isVisible}
      title='Fənn filterləri'
      okText='Təsdiqlə'
      cancelText='Çıx'
      okButtonProps={{ loading: getSubjectsDataLoading }}
      onOk={handleOk}
      onCancel={handleCancel}
      width='50%'
      // bodyStyle={{
      //   overflowY: 'scroll',
      //   height: 'calc(100vh -  210px)',
      // }}
      destroyOnClose
    >
      <Form
        form={form}
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        labelAlign='left'
      >
        <Form.Item label='Ad' name='adi'>
          <Input />
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
        closeModal,
        getSubjectsData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(FilterModal));

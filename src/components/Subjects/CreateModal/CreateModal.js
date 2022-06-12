import { Form, Input, Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import { closeModal } from '../../../Redux/Slices/ModalSlice';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { createSubject } from '../../../Redux/Slices/SubjectSlice';
// import PropTypes from 'prop-types';
// import styles from './CreateModal.module.css';

const CreateModal = ({ SubjectSlice, closeModal, createSubject }) => {
  const { createLoading } = SubjectSlice || {};

  const isVisible = useModalStatus(MODALS.SUBJECTS_CREATE);

  const [form] = Form.useForm();

  const handleOk = () => {
    createSubject(normalizeFilterData(form.getFieldsValue()));
  };

  const handleCancel = () => {
    closeModal(MODALS.SUBJECTS_CREATE);
  };

  return (
    <Modal
      centered
      visible={isVisible}
      title='Fənn əlavə etmək'
      okText='Təsdiqlə'
      cancelText='Çıx'
      okButtonProps={{ loading: createLoading }}
      onOk={handleOk}
      onCancel={handleCancel}
      width='50%'
      // bodyStyle={{
      //   overflowY: 'scroll',
      //   height: 'calc(100vh -  210px)',
      // }}
      destroyOnClose
      afterClose={() => {
        form.resetFields();
      }}
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
        createSubject,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

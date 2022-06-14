import { Form, Input, Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { createSubject } from '../../../Redux/Slices/SubjectSlice';
// import PropTypes from 'prop-types';
// import styles from './CreateModal.module.css';

const CreateModal = ({ SubjectSlice, createSubject }) => {
  const { createLoading = false } = SubjectSlice || {};

  const { visible = false, hideModal } = useModalStatus(MODALS.SUBJECT_CREATE);

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    createSubject(normalizeFilterData(values));
  };

  const handleCancel = () => {
    hideModal();
  };

  const afterClose = () => {
    form.resetFields();
  };

  return (
    <Modal
      centered
      visible={visible}
      title='Əlavə etmək'
      okText='Təsdiqlə'
      cancelText='Çıx'
      okButtonProps={{
        loading: createLoading,
        form: MODALS.SUBJECT_CREATE,
        htmlType: 'submit',
      }}
      onCancel={handleCancel}
      afterClose={afterClose}
      destroyOnClose
    >
      <Form form={form} name={MODALS.SUBJECT_CREATE} onFinish={handleFinish}>
        <Form.Item
          label='Ad'
          name='adi'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Input autoFocus />
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
        createSubject,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

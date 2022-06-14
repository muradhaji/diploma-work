import { Form, Input, Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { createProfession } from '../../../Redux/Slices/ProfessionSlice';
// import PropTypes from 'prop-types';
// import styles from './CreateModal.module.css';

const CreateModal = ({ ProfessionSlice, createProfession }) => {
  const { createLoading = false } = ProfessionSlice || {};

  const { visible = false, hideModal } = useModalStatus(
    MODALS.PROFESSION_CREATE
  );

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    createProfession(normalizeFilterData(values));
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
        form: MODALS.PROFESSION_CREATE,
        htmlType: 'submit',
      }}
      onCancel={handleCancel}
      afterClose={afterClose}
      destroyOnClose
    >
      <Form
        form={form}
        name={MODALS.PROFESSION_CREATE}
        onFinish={handleFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        labelAlign='left'
      >
        <Form.Item
          label='Kod'
          name='kod'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
            { len: 6, message: 'İxtisas kodu 6 simvoldan ibarət olmalıdır!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Ad'
          name='ad'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
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
        createProfession,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

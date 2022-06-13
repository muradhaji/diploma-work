import { Form, Input, Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { createArticleType } from '../../../Redux/Slices/ArticleTypeSlice';
// import PropTypes from 'prop-types';
// import styles from './CreateModal.module.css';

const CreateModal = ({ ArticleTypeSlice, createArticleType }) => {
  const { createLoading = false } = ArticleTypeSlice || {};

  const { visible = false, hideModal } = useModalStatus(
    MODALS.ARTICLE_TYPE_CREATE
  );

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    createArticleType(normalizeFilterData(values));
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
      title='Məqalə tipi əlavə etmək'
      okText='Təsdiqlə'
      cancelText='Çıx'
      okButtonProps={{
        loading: createLoading,
        form: MODALS.ARTICLE_TYPE_CREATE,
        htmlType: 'submit',
      }}
      onCancel={handleCancel}
      afterClose={afterClose}
      destroyOnClose
    >
      <Form
        form={form}
        name={MODALS.ARTICLE_TYPE_CREATE}
        onFinish={handleFinish}
      >
        <Form.Item
          label='Ad'
          name='adi'
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
  const { articleTypes: ArticleTypeSlice = null } = state || {};
  return {
    ArticleTypeSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        createArticleType,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

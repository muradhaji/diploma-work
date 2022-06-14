import { Form, Input, Modal } from 'antd';
import React, { memo, useEffect } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { updateArticleType } from '../../../Redux/Slices/ArticleTypeSlice';
// import PropTypes from 'prop-types';
// import styles from './UpdateModal.module.css';

const CreateModal = ({ ArticleTypeSlice, updateArticleType }) => {
  const { updateLoading = false, selectedArticleType = null } =
    ArticleTypeSlice || {};

  const { id: selectedId = null, adi: selectedName = '' } =
    selectedArticleType || {};

  const { visible = false, hideModal } = useModalStatus(
    MODALS.ARTICLE_TYPE_EDIT
  );

  useEffect(() => {
    if (visible && selectedArticleType) {
      form.setFieldsValue({ adi: selectedName });
    }
    // eslint-disable-next-line
  }, [visible]);

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    if (selectedArticleType) {
      updateArticleType(selectedId, normalizeFilterData(values));
    }
  };

  const handleCancel = () => {
    hideModal();
    form.resetFields();
  };

  return (
    <Modal
      centered
      visible={visible}
      title='Redaktə etmək'
      okText='Təsdiqlə'
      cancelText='Çıx'
      okButtonProps={{
        loading: updateLoading,
        form: MODALS.ARTICLE_TYPE_EDIT,
        htmlType: 'submit',
      }}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form form={form} name={MODALS.ARTICLE_TYPE_EDIT} onFinish={handleFinish}>
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
  const { articleTypes: ArticleTypeSlice = null } = state || {};
  return {
    ArticleTypeSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        updateArticleType,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

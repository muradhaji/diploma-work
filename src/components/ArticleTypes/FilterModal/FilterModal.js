import { Form, Input, Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { getFilteredArticleTypesData } from '../../../Redux/Slices/ArticleTypeSlice';
// import PropTypes from 'prop-types';
// import styles from './FilterModal.module.css';

const FilterModal = ({ ArticleTypeSlice, getFilteredArticleTypesData }) => {
  const { loading: getFilteredArticleTypesDataLoading = false } =
    ArticleTypeSlice || {};

  const { visible = false, hideModal } = useModalStatus(
    MODALS.ARTICLE_TYPE_FILTER
  );

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    getFilteredArticleTypesData(normalizeFilterData(values));
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
        loading: getFilteredArticleTypesDataLoading,
        form: MODALS.ARTICLE_TYPE_FILTER,
        htmlType: 'submit',
      }}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        form={form}
        name={MODALS.ARTICLE_TYPE_FILTER}
        onFinish={handleFinish}
      >
        <Form.Item label='Ad' name='adi'>
          <Input autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  );
};

FilterModal.propTypes = {};

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
        getFilteredArticleTypesData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(FilterModal));

import { Form, Input, Modal } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { getFilteredProfessionsData } from '../../../Redux/Slices/ProfessionSlice';
// import PropTypes from 'prop-types';
// import styles from './FilterModal.module.css';

const FilterModal = ({ ProfessionSlice, getFilteredProfessionsData }) => {
  const { loading: getFilteredProfessionsDataLoading = false } =
    ProfessionSlice || {};

  const { visible = false, hideModal } = useModalStatus(
    MODALS.PROFESSION_FILTER
  );

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    getFilteredProfessionsData(normalizeFilterData(values));
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
        loading: getFilteredProfessionsDataLoading,
        form: MODALS.PROFESSION_FILTER,
        htmlType: 'submit',
      }}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        form={form}
        name={MODALS.PROFESSION_FILTER}
        onFinish={handleFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        labelAlign='left'
      >
        <Form.Item label='Kod' name='kod'>
          <Input autoFocus />
        </Form.Item>
        <Form.Item label='Ad' name='ad'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

FilterModal.propTypes = {};

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
        getFilteredProfessionsData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(FilterModal));

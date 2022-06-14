import { Form, Input, Modal } from 'antd';
import React, { memo, useEffect } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { updateProfession } from '../../../Redux/Slices/ProfessionSlice';
// import PropTypes from 'prop-types';
// import styles from './UpdateModal.module.css';

const CreateModal = ({ ProfessionSlice, updateProfession }) => {
  const { updateLoading = false, selectedProfession = null } =
    ProfessionSlice || {};

  const { id: selectedId = null, ...selectedData } = selectedProfession || {};

  const { visible = false, hideModal } = useModalStatus(MODALS.PROFESSION_EDIT);

  useEffect(() => {
    if (visible && selectedProfession) {
      form.setFieldsValue(selectedData);
    }
    // eslint-disable-next-line
  }, [visible]);

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    if (selectedProfession) {
      updateProfession(selectedId, normalizeFilterData(values));
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
        form: MODALS.PROFESSION_EDIT,
        htmlType: 'submit',
      }}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        form={form}
        name={MODALS.PROFESSION_EDIT}
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
          <Input autoFocus />
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
        updateProfession,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

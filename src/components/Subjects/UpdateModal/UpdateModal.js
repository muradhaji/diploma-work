import { Form, Input, Modal } from 'antd';
import React, { memo, useEffect } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { updateSubject } from '../../../Redux/Slices/SubjectSlice';
// import PropTypes from 'prop-types';
// import styles from './UpdateModal.module.css';

const CreateModal = ({ SubjectSlice, updateSubject }) => {
  const { updateLoading = false, selectedSubject = null } = SubjectSlice || {};

  const { id: selectedId = null, adi: selectedName = '' } =
    selectedSubject || {};

  const { visible = false, hideModal } = useModalStatus(MODALS.SUBJECT_EDIT);

  useEffect(() => {
    if (visible && selectedSubject) {
      form.setFieldsValue({ adi: selectedName });
    }
    // eslint-disable-next-line
  }, [visible]);

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    if (selectedSubject) {
      updateSubject(selectedId, normalizeFilterData(values));
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
      title='Fənni redaktə etmək'
      okText='Təsdiqlə'
      cancelText='Çıx'
      okButtonProps={{
        loading: updateLoading,
        form: MODALS.SUBJECT_EDIT,
        htmlType: 'submit',
      }}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form form={form} name={MODALS.SUBJECT_EDIT} onFinish={handleFinish}>
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
  const { subjects: SubjectSlice = null } = state || {};
  return {
    SubjectSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        updateSubject,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

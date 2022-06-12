import { Form, Input, Modal } from 'antd';
import React, { memo, useEffect } from 'react';
import { MODALS } from '../../../constants';
import { closeModal } from '../../../Redux/Slices/ModalSlice';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { updateSubject } from '../../../Redux/Slices/SubjectSlice';
// import PropTypes from 'prop-types';
// import styles from './UpdateModal.module.css';

const CreateModal = ({ SubjectSlice, closeModal, updateSubject }) => {
  const { updateLoading, selectedSubject = null } = SubjectSlice || {};

  const isVisible = useModalStatus(MODALS.SUBJECTS_EDIT);

  useEffect(() => {
    if (isVisible && selectedSubject) {
      const { adi } = selectedSubject || {};
      form.setFieldsValue({ adi });
    }
    // eslint-disable-next-line
  }, [isVisible]);

  const [form] = Form.useForm();

  const handleOk = () => {
    const { id } = selectedSubject || {};
    if (id) {
      updateSubject(id, normalizeFilterData(form.getFieldsValue()));
    }
  };

  const handleCancel = () => {
    closeModal(MODALS.SUBJECTS_EDIT);
    form.resetFields();
  };

  return (
    <Modal
      centered
      visible={isVisible}
      title='Fənni redaktə etmək'
      okText='Təsdiqlə'
      cancelText='Çıx'
      okButtonProps={{ loading: updateLoading }}
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
        updateSubject,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

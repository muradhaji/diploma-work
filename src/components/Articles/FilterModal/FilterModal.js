import { DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import { closeModal } from '../../../Redux/Slices/ModalSlice';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { getArticlesData } from '../../../Redux/Slices/ArticleSlice';
import { normalizeFilterData } from '../../../helperFunctions';
import { map } from 'lodash';
// import PropTypes from 'prop-types';
// import styles from './FilterModal.module.css';

const FilterModal = ({
  TeacherSlice,
  ArticleTypeSlice,
  closeModal,
  getArticlesData,
}) => {
  const {
    data: teachersData,
    loading: getTeachersDataLoading,
    // error,
  } = TeacherSlice || {};

  const {
    data: articleTypesData,
    loading: ArticleTypesDataLoading,
    // error,
  } = ArticleTypeSlice || {};

  const isVisible = useModalStatus(MODALS.ARTICLE_FILTER);

  const [form] = Form.useForm();

  const handleOk = () => {
    getArticlesData(normalizeFilterData(form.getFieldsValue()));
    closeModal(MODALS.ARTICLE_FILTER);
  };

  const handleCancel = () => {
    closeModal(MODALS.ARTICLE_FILTER);
  };

  return (
    <Modal
      centered
      visible={isVisible}
      title='Məqalə filterləri'
      okText='Filterlə'
      cancelText='Çıx'
      onOk={handleOk}
      onCancel={handleCancel}
      width='50%'
      bodyStyle={{
        overflowY: 'scroll',
        height: 'calc(100vh -  210px)',
      }}
      destroyOnClose
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign='left'
      >
        <Form.Item label='Ad' name='name'>
          <Input />
        </Form.Item>
        <Form.Item label='Müəllim' name='teacher'>
          <Select loading={getTeachersDataLoading}>
            {map(teachersData, (teacher) => (
              <Select.Option key={teacher.id}>
                {teacher.ad} {teacher.soyad} {teacher.ata_adi}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Həm müəlliflər' name='hem_muellifler'>
          <Input />
        </Form.Item>
        <Form.Item label='Tip' name='tipi'>
          <Select mode='multiple' loading={ArticleTypesDataLoading}>
            {map(articleTypesData, (subject) => (
              <Select.Option key={subject.id}>{subject.adi}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Çap olunduğu jurnal' name='cap_olundugu_jurnal'>
          <Input />
        </Form.Item>
        <Form.Item label='İli' name='ili'>
          <DatePicker picker='year' format='YYYY' style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label='Səhfə sayı' name='sehfesi'>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label='İndex nömrəsi' name='index_nom'>
          <Input />
        </Form.Item>
        <Form.Item label='Çap olunduğu yer' name='meqalenin_cap_oldugu_yer'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

FilterModal.propTypes = {};

const mapStateToProps = (state) => {
  const {
    teachers: TeacherSlice = null,
    articleTypes: ArticleTypeSlice = null,
  } = state || {};
  return {
    TeacherSlice,
    ArticleTypeSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        closeModal,
        getArticlesData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(FilterModal));

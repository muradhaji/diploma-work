import { DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import React, { memo } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { getFilteredArticlesData } from '../../../Redux/Slices/ArticleSlice';
import { map } from 'lodash';
// import PropTypes from 'prop-types';
// import styles from './FilterModal.module.css';

const FilterModal = ({
  ArticleSlice,
  TeacherSlice,
  ArticleTypeSlice,
  getFilteredArticlesData,
}) => {
  const { loading: getFilteredArticlesDataLoading = false } =
    ArticleSlice || {};

  const { data: teachersData = null, loading: getTeachersDataLoading = false } =
    TeacherSlice || {};

  const {
    data: articleTypesData = null,
    loading: ArticleTypesDataLoading = false,
  } = ArticleTypeSlice || {};

  const { visible = false, hideModal } = useModalStatus(MODALS.ARTICLE_FILTER);

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    getFilteredArticlesData(normalizeFilterData(values));
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
        loading: getFilteredArticlesDataLoading,
        form: MODALS.ARTICLE_FILTER,
        htmlType: 'submit',
      }}
      onCancel={handleCancel}
      destroyOnClose
      width='50%'
      bodyStyle={{
        overflowY: 'scroll',
        height: 'calc(100vh -  210px)',
      }}
    >
      <Form
        form={form}
        name={MODALS.ARTICLE_FILTER}
        onFinish={handleFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign='left'
      >
        <Form.Item label='Ad' name='name'>
          <Input allowClear autoFocus />
        </Form.Item>
        <Form.Item label='Müəllim' name='teacher'>
          <Select loading={getTeachersDataLoading} allowClear>
            {map(teachersData, (teacher) => (
              <Select.Option key={teacher.id}>
                {teacher.ad} {teacher.soyad} {teacher.ata_adi}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Həm müəlliflər' name='hem_muellifler'>
          <Input allowClear />
        </Form.Item>
        <Form.Item label='Tip' name='tipi'>
          <Select mode='multiple' loading={ArticleTypesDataLoading} allowClear>
            {map(articleTypesData, (subject) => (
              <Select.Option key={subject.id}>{subject.adi}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Çap olunduğu jurnal' name='cap_olundugu_jurnal'>
          <Input allowClear />
        </Form.Item>
        <Form.Item label='İli' name='ili'>
          <DatePicker
            picker='year'
            format='YYYY'
            style={{ width: '100%' }}
            allowClear
          />
        </Form.Item>
        <Form.Item label='Səhfə sayı' name='sehfesi'>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label='İndex nömrəsi' name='index_nom'>
          <Input allowClear />
        </Form.Item>
        <Form.Item label='Çap olunduğu yer' name='meqalenin_cap_oldugu_yer'>
          <Input allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

FilterModal.propTypes = {};

const mapStateToProps = (state) => {
  const {
    articles: ArticleSlice = null,
    teachers: TeacherSlice = null,
    articleTypes: ArticleTypeSlice = null,
  } = state || {};
  return {
    ArticleSlice,
    TeacherSlice,
    ArticleTypeSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        getFilteredArticlesData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(FilterModal));

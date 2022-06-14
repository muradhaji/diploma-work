import { DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import React, { memo, useEffect } from 'react';
import { MODALS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { updateArticle } from '../../../Redux/Slices/ArticleSlice';
import { map, toString } from 'lodash';
import moment from 'moment';
// import PropTypes from 'prop-types';
// import styles from './UpdateModal.module.css';

const CreateModal = ({
  ArticleSlice,
  TeacherSlice,
  ArticleTypeSlice,
  updateArticle,
}) => {
  const { updateLoading = false, selectedArticle = null } = ArticleSlice || {};

  const { data: teachersData = null, loading: getTeachersDataLoading = false } =
    TeacherSlice || {};

  const {
    data: articleTypesData = null,
    loading: ArticleTypesDataLoading = false,
  } = ArticleTypeSlice || {};

  const { id: selectedId = null, ...selectedData } = selectedArticle || {};

  const { visible = false, hideModal } = useModalStatus(MODALS.ARTICLE_EDIT);

  useEffect(() => {
    if (visible && selectedArticle) {
      form.setFieldsValue({
        ...selectedData,
        ili: moment(toString(selectedData.ili)),
        teacher: toString(selectedData.teacher),
        tipi: toString(selectedData.tipi),
      });
    }
    // eslint-disable-next-line
  }, [visible]);

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    if (selectedArticle) {
      updateArticle(selectedId, normalizeFilterData(values));
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
        form: MODALS.ARTICLE_EDIT,
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
        name={MODALS.ARTICLE_EDIT}
        onFinish={handleFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign='left'
      >
        <Form.Item
          label='Ad'
          name='name'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Input allowClear autoFocus />
        </Form.Item>
        <Form.Item
          label='Müəllim'
          name='teacher'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
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
        <Form.Item
          label='Tip'
          name='tipi'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Select loading={ArticleTypesDataLoading} allowClear>
            {map(articleTypesData, (subject) => (
              <Select.Option key={subject.id}>{subject.adi}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Çap olunduğu jurnal' name='cap_olundugu_jurnal'>
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label='İli'
          name='ili'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <DatePicker
            picker='year'
            format='YYYY'
            style={{ width: '100%' }}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label='Səhfə sayı'
          name='sehfesi'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label='İndex nömrəsi'
          name='index_nom'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label='Çap olunduğu yer'
          name='meqalenin_cap_oldugu_yer'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Input allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateModal.propTypes = {};

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
        updateArticle,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

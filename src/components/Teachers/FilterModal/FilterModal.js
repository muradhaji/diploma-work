import { DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import React, { memo } from 'react';
import { MODALS, STATICS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { getFilteredTeachersData } from '../../../Redux/Slices/TeacherSlice';
import { map } from 'lodash';
// import PropTypes from 'prop-types';
// import styles from './FilterModal.module.css';

const FilterModal = ({
  TeacherSlice,
  SubjectSlice,
  ProfessionSlice,
  getFilteredTeachersData,
}) => {
  const { loading: getFilteredTeachersDataLoading = false } =
    TeacherSlice || {};

  const { data: subjectsData = null, loading: getSubjectsDataLoading = false } =
    SubjectSlice || {};

  const {
    data: professionsData = null,
    loading: getProfessionsDataLoading = false,
  } = ProfessionSlice || {};

  const { visible = false, hideModal } = useModalStatus(MODALS.TEACHER_FILTER);

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    getFilteredTeachersData(normalizeFilterData(values));
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
        loading: getFilteredTeachersDataLoading,
        form: MODALS.TEACHER_FILTER,
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
        name={MODALS.TEACHER_FILTER}
        onFinish={handleFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign='left'
      >
        <Form.Item label='Ad' name='ad'>
          <Input autoFocus allowClear />
        </Form.Item>
        <Form.Item label='Soyad' name='soyad'>
          <Input allowClear />
        </Form.Item>
        <Form.Item label='Ata adı' name='ata_adi'>
          <Input allowClear />
        </Form.Item>
        <Form.Item label='Cins' name='gender'>
          <Select allowClear>
            {map(STATICS.TEACHER.gender, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Təhsil' name='tehsil'>
          <Select allowClear>
            {map(STATICS.TEACHER.tehsil, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Elmi dərəcə' name='elmi_derece'>
          <Select allowClear>
            {map(STATICS.TEACHER.elmi_derece, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Vəzifə' name='vezife'>
          <Select allowClear>
            {map(STATICS.TEACHER.vezife, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Fənnlər' name='fenler'>
          <Select mode='multiple' loading={getSubjectsDataLoading} allowClear>
            {map(subjectsData, (subject) => (
              <Select.Option key={subject.id}>{subject.adi}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Bölmə' name='bolme'>
          <Select allowClear>
            {map(STATICS.TEACHER.bolme, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Doğum tarixi' name='dogum_tarixi'>
          <DatePicker
            format='DD/MM/YYYY'
            style={{ width: '100%' }}
            allowClear
          />
        </Form.Item>
        <Form.Item label='Doğulduğu yer' name='doguldugu_yer'>
          <Input allowClear />
        </Form.Item>
        <Form.Item label='Qeydiyyatda yeri' name='qeydiyatda_oldugu_unvan'>
          <Input allowClear />
        </Form.Item>
        <Form.Item label='Yaşadığı yer' name='faktiki_yasaadigi_unvan'>
          <Input allowClear />
        </Form.Item>
        <Form.Item label='Bitirdiyi ali məktəb' name='bitirdiyi_universitet'>
          <Input allowClear />
        </Form.Item>
        <Form.Item label='İxtisas' name='ixtisas'>
          <Select loading={getProfessionsDataLoading} allowClear>
            {map(professionsData, (profession) => (
              <Select.Option key={profession.id}>
                #{profession.kod} {profession.ad}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Ailə vəziyyəti' name='aile_vezyeti'>
          <Select allowClear>
            {map(STATICS.TEACHER.aile_vezyeti, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Partiya mənsubiyyəti' name='partiya_mensubiyeti'>
          <Input allowClear />
        </Form.Item>
        <Form.Item label='Əsas iş yeri' name='main_work'>
          <Input allowClear />
        </Form.Item>
        <Form.Item label='Hərbi mükəlləfiyyət' name='herbi_mukellefiyet'>
          <Radio.Group>
            <Radio value={true}>Hə</Radio>
            <Radio value={false}>Yox</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

FilterModal.propTypes = {};

const mapStateToProps = (state) => {
  const {
    teachers: TeacherSlice = null,
    subjects: SubjectSlice = null,
    professions: ProfessionSlice = null,
  } = state || {};
  return {
    TeacherSlice,
    SubjectSlice,
    ProfessionSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        getFilteredTeachersData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(FilterModal));

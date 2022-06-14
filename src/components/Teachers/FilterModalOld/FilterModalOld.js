import { DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import React, { memo } from 'react';
import { MODALS, STATICS } from '../../../constants';
import { closeModal } from '../../../Redux/Slices/ModalSlice';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { getTeachersData } from '../../../Redux/Slices/TeacherSlice';
import { normalizeFilterData } from '../../../helperFunctions';
import { map } from 'lodash';
// import PropTypes from 'prop-types';
// import styles from './FilterModal.module.css';

const FilterModal = ({
  SubjectSlice,
  ProfessionSlice,
  closeModal,
  getTeachersData,
}) => {
  const {
    data: subjectsData,
    loading: getSubjectsDataLoading,
    // error,
  } = SubjectSlice || {};

  const {
    data: professionsData,
    loading: getProfessionsDataLoading,
    // error,
  } = ProfessionSlice || {};

  const { visible: isVisible = false } = useModalStatus(MODALS.TEACHER_FILTER);

  const [form] = Form.useForm();

  const handleOk = () => {
    getTeachersData(normalizeFilterData(form.getFieldsValue()));
    closeModal(MODALS.TEACHER_FILTER);
  };

  const handleCancel = () => {
    closeModal(MODALS.TEACHER_FILTER);
  };

  return (
    <Modal
      centered
      visible={isVisible}
      title='Filterləmək'
      okText='Filterlə'
      cancelText='Çıx'
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ loading: getSubjectsDataLoading }}
      width={700}
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
        <Form.Item label='Ad' name='ad'>
          <Input autoFocus />
        </Form.Item>
        <Form.Item label='Soyad' name='soyad'>
          <Input />
        </Form.Item>
        <Form.Item label='Ata adı' name='ata_adi'>
          <Input />
        </Form.Item>
        <Form.Item label='Cins' name='gender'>
          <Select>
            {map(STATICS.TEACHER.gender, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Təhsil' name='tehsil'>
          <Select>
            {map(STATICS.TEACHER.tehsil, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Elmi dərəcə' name='elmi_derece'>
          <Select>
            {map(STATICS.TEACHER.elmi_derece, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Vəzifə' name='vezife'>
          <Select>
            {map(STATICS.TEACHER.vezife, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Fənnlər' name='fenler'>
          <Select mode='multiple' loading={getSubjectsDataLoading}>
            {map(subjectsData, (subject) => (
              <Select.Option key={subject.id}>{subject.adi}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Bölmə' name='bolme'>
          <Select>
            {map(STATICS.TEACHER.bolme, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Doğum tarixi' name='dogum_tarixi'>
          <DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label='Doğulduğu yer' name='doguldugu_yer'>
          <Input />
        </Form.Item>
        <Form.Item label='Qeydiyyatda yeri' name='qeydiyatda_oldugu_unvan'>
          <Input />
        </Form.Item>
        <Form.Item label='Yaşadığı yer' name='faktiki_yasaadigi_unvan'>
          <Input />
        </Form.Item>
        <Form.Item label='Bitirdiyi ali məktəb' name='bitirdiyi_universitet'>
          <Input />
        </Form.Item>
        <Form.Item label='İxtisas' name='ixtisas'>
          <Select loading={getProfessionsDataLoading}>
            {map(professionsData, (profession) => (
              <Select.Option key={profession.id}>
                #{profession.kod} {profession.ad}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Ailə vəziyyəti' name='aile_vezyeti'>
          <Select>
            {map(STATICS.TEACHER.aile_vezyeti, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Partiya mənsubiyyəti' name='partiya_mensubiyeti'>
          <Input />
        </Form.Item>
        <Form.Item label='Əsas iş yeri' name='main_work'>
          <Input />
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
  const { subjects: SubjectSlice = null, professions: ProfessionSlice = null } =
    state || {};
  return {
    SubjectSlice,
    ProfessionSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        closeModal,
        getTeachersData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(FilterModal));

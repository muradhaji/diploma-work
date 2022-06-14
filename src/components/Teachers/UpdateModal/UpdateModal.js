import { DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import React, { memo, useEffect } from 'react';
import { MODALS, STATICS } from '../../../constants';
import useModalStatus from '../../../Hooks/useModalStatus';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { normalizeFilterData } from '../../../helperFunctions';
import { updateTeacher } from '../../../Redux/Slices/TeacherSlice';
import { map, toString } from 'lodash';
import moment from 'moment';
// import PropTypes from 'prop-types';
// import styles from './UpdateModal.module.css';

const CreateModal = ({
  TeacherSlice,
  SubjectSlice,
  ProfessionSlice,
  updateTeacher,
}) => {
  const { updateLoading = false, selectedTeacher = null } = TeacherSlice || {};

  const { data: subjectsData = null, loading: getSubjectsDataLoading = false } =
    SubjectSlice || {};

  const {
    data: professionsData = null,
    loading: getProfessionsDataLoading = false,
  } = ProfessionSlice || {};

  const { id: selectedId = null, ...selectedData } = selectedTeacher || {};

  const { visible = false, hideModal } = useModalStatus(MODALS.TEACHER_EDIT);

  useEffect(() => {
    if (visible && selectedTeacher) {
      form.setFieldsValue({
        ...selectedData,
        dogum_tarixi: moment(selectedData.dogum_tarixi, 'DD.MM.YYYY'),
        ixtisas: toString(selectedData.ixtisas),
        fenler: map(selectedData.fenler, (value) => {
          return toString(value);
        }),
      });
    }
    // eslint-disable-next-line
  }, [visible]);

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    if (selectedTeacher) {
      updateTeacher(selectedId, normalizeFilterData(values));
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
        form: MODALS.TEACHER_EDIT,
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
        name={MODALS.TEACHER_EDIT}
        onFinish={handleFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign='left'
      >
        <Form.Item
          label='Ad'
          name='ad'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Input autoFocus allowClear />
        </Form.Item>
        <Form.Item
          label='Soyad'
          name='soyad'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label='Ata adı'
          name='ata_adi'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item label='Cins' name='gender'>
          <Select allowClear>
            {map(STATICS.TEACHER.gender, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label='Təhsil'
          name='tehsil'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
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
        <Form.Item
          label='Bölmə'
          name='bolme'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Select allowClear>
            {map(STATICS.TEACHER.bolme, (value, key) => (
              <Select.Option key={key}>{value}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Doğum tarixi' name='dogum_tarixi'>
          <DatePicker
            format='DD.MM.YYYY'
            style={{ width: '100%' }}
            allowClear
          />
        </Form.Item>
        <Form.Item label='Doğulduğu yer' name='doguldugu_yer'>
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label='Qeydiyyat yeri'
          name='qeydiyatda_oldugu_unvan'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label='Yaşadığı yer'
          name='faktiki_yasaadigi_unvan'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label='Bitirdiyi ali məktəb'
          name='bitirdiyi_universitet'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label='İxtisas'
          name='ixtisas'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Select loading={getProfessionsDataLoading} allowClear>
            {map(professionsData, (profession) => (
              <Select.Option key={profession.id}>
                #{profession.kod} {profession.ad}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label='Ailə vəziyyəti'
          name='aile_vezyeti'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
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
        <Form.Item
          label='Hərbi mükəlləfiyyət'
          name='herbi_mukellefiyet'
          rules={[
            { required: true, message: 'Bu sahə mütləq doldurulmalıdır!' },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>Hə</Radio>
            <Radio value={false}>Yox</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateModal.propTypes = {};

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
        updateTeacher,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateModal));

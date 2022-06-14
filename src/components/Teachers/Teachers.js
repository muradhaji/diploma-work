import React, { memo, useEffect, useMemo } from 'react';
import { Button, Empty, Space, Table, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { MODALS, STATICS } from './../../constants';
import PageLayout from '../PageLayout';
import { openModal } from '../../Redux/Slices/ModalSlice';
import {
  getTeachersData,
  setSelectedTeacher,
} from '../../Redux/Slices/TeacherSlice';
import { getSubjectsData } from '../../Redux/Slices/SubjectSlice';
import { getProfessionsData } from '../../Redux/Slices/ProfessionSlice';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import FilterModal from './FilterModal';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
// import PropTypes from 'prop-types';
// import styles from './Teachers.module.css';

const Teachers = ({
  TeacherSlice,
  SubjectSlice,
  ProfessionSlice,
  openModal,
  setSelectedTeacher,
  getTeachersData,
  getSubjectsData,
  getProfessionsData,
}) => {
  const { data: teachersData = null, loading: getTeachersDataLoading = false } =
    TeacherSlice || {};

  const { data: subjectsData = null, loading: getSubjectsDataLoading = false } =
    SubjectSlice || {};

  const {
    data: professionsData = null,
    loading: getProfessionsDataLoading = false,
  } = ProfessionSlice || {};

  useEffect(() => {
    getTeachersData();
    getSubjectsData();
    getProfessionsData();
    // eslint-disable-next-line
  }, []);

  const teachersTableColumns = [
    {
      key: 'index',
      dataIndex: 'index',
      title: '#',
      fixed: 'left',
    },
    {
      key: 'ad',
      dataIndex: 'ad',
      title: 'Ad',
      fixed: 'left',
    },
    {
      key: 'soyad',
      dataIndex: 'soyad',
      title: 'Soyad',
      fixed: 'left',
    },
    {
      key: 'ata_adi',
      dataIndex: 'ata_adi',
      title: 'Ata adı',
    },
    {
      key: 'gender',
      dataIndex: 'gender',
      title: 'Cins',
      render: (data) => STATICS.TEACHER.gender[data],
    },
    {
      key: 'tehsil',
      dataIndex: 'tehsil',
      title: 'Təhsil',
      render: (data) => STATICS.TEACHER.tehsil[data],
    },
    {
      key: 'elmi_derece',
      dataIndex: 'elmi_derece',
      title: 'Elmi Dərəcə',
      render: (data) => STATICS.TEACHER.elmi_derece[data],
    },
    {
      key: 'vezife',
      dataIndex: 'vezife',
      title: 'Vəzifə',
      render: (data) => STATICS.TEACHER.vezife[data],
    },
    {
      key: 'fenler',
      dataIndex: 'fenler',
      title: 'Fənnlər',
      render: (subjectIds) => {
        return (
          subjectIds &&
          subjectIds
            .map((subjectId) => {
              const foundItem = find(subjectsData, ['id', subjectId]);
              return foundItem ? foundItem['adi'] : subjectId;
            })
            .join(', ')
        );
      },
    },
    {
      key: 'bolme',
      dataIndex: 'bolme',
      title: 'Bölmə',
      render: (data) => STATICS.TEACHER.bolme[data],
    },
    {
      key: 'dogum_tarixi',
      dataIndex: 'dogum_tarixi',
      title: 'Doğum tarixi',
    },
    {
      key: 'doguldugu_yer',
      dataIndex: 'doguldugu_yer',
      title: 'Doğulduğu yer',
    },
    {
      key: 'qeydiyatda_oldugu_unvan',
      dataIndex: 'qeydiyatda_oldugu_unvan',
      title: 'Qeydiyyat yeri',
    },
    {
      key: 'faktiki_yasaadigi_unvan',
      dataIndex: 'faktiki_yasaadigi_unvan',
      title: 'Yaşadığı yer',
    },
    {
      key: 'bitirdiyi_universitet',
      dataIndex: 'bitirdiyi_universitet',
      title: 'Bitiriyi ali məktəb',
    },
    {
      key: 'ixtisas',
      dataIndex: 'ixtisas',
      title: 'İxtisas',
      render: (professionId) => {
        const foundItem = find(professionsData, ['id', professionId]);
        return foundItem
          ? `#${foundItem['kod']}: ${foundItem['ad']}`
          : professionId;
      },
    },
    {
      key: 'aile_vezyeti',
      dataIndex: 'aile_vezyeti',
      title: 'Ailə vəziyyəti',
      render: (data) => STATICS.TEACHER.aile_vezyeti[data],
    },
    {
      key: 'partiya_mensubiyeti',
      dataIndex: 'partiya_mensubiyeti',
      title: 'Partiya',
    },
    {
      key: 'main_work',
      dataIndex: 'main_work',
      title: 'Əsas iş yeri',
    },
    {
      key: 'herbi_mukellefiyet',
      dataIndex: 'herbi_mukellefiyet',
      title: 'Hərbi mükəlləfiyyət',
      render: (data) => (data ? 'Hə' : 'Yox'),
    },
    {
      key: 'elmi_meqalelerin_sayi',
      dataIndex: 'elmi_meqalelerin_sayi',
      title: 'Elmi Tİ-lərinin sayı',
    },
    {
      key: 'actions',
      title: 'Düymələr',
      fixed: 'right',
      render: (record) => (
        <Space>
          <Tooltip title='Redaktə et'>
            <Button
              type='primary'
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedTeacher(record);
                openModal(MODALS.TEACHER_EDIT);
              }}
            />
          </Tooltip>
          <Tooltip title='Sil'>
            <Button
              type='primary'
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setSelectedTeacher(record);
                openModal(MODALS.TEACHER_DELETE);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const teachersTableData = useMemo(() => {
    return teachersData
      ? teachersData.map((item, index) => {
          return {
            key: index,
            index: index + 1,
            ...item,
          };
        })
      : [];
  }, [teachersData]);

  const pageButtons = (
    <>
      <Button type='primary' onClick={() => openModal(MODALS.TEACHER_FILTER)}>
        Filterlə
      </Button>
      <Button type='primary' onClick={() => openModal(MODALS.TEACHER_CREATE)}>
        Əlavə et
      </Button>
    </>
  );

  const pageContent = (
    <>
      <FilterModal />
      <CreateModal />
      <UpdateModal />
      <DeleteModal />
      <Table
        bordered
        size='small'
        rowClassName={(_, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
        loading={
          getTeachersDataLoading ||
          getSubjectsDataLoading ||
          getProfessionsDataLoading
        }
        columns={teachersTableColumns}
        dataSource={teachersTableData}
        scroll={{ x: 'auto' }}
        style={{
          whiteSpace: 'nowrap',
        }}
        locale={{
          emptyText: (
            <Empty
              description='Nəticə tapılmadı.'
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
      />
    </>
  );

  return <PageLayout buttons={pageButtons} content={pageContent} />;
};

Teachers.propTypes = {};

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
        openModal,
        setSelectedTeacher,
        getTeachersData,
        getSubjectsData,
        getProfessionsData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Teachers));

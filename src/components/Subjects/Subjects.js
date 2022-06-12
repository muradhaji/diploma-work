import React, { memo, useEffect, useMemo } from 'react';
import { Button, Empty, Space, Table, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { MODALS } from '../../constants';
import PageLayout from '../PageLayout';
import {
  toggleModal,
  openModal,
  closeModal,
} from '../../Redux/Slices/ModalSlice';
import { getSubjectsData } from '../../Redux/Slices/SubjectSlice';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';
// import styles from './Subjects.module.css';

const Subjects = ({
  SubjectSlice,
  toggleModal,
  openModal,
  closeModal,
  getSubjectsData,
}) => {
  const {
    data: subjectsData,
    loading: getSubjectsDataLoading,
    // error,
  } = SubjectSlice || {};

  useEffect(() => {
    getSubjectsData();
    // eslint-disable-next-line
  }, []);

  const subjectsTableColumns = [
    {
      key: 'index',
      dataIndex: 'index',
      title: '#',
      fixed: 'left',
    },
    {
      key: 'adi',
      dataIndex: 'adi',
      title: 'Ad',
      width: '100%',
    },
    {
      key: 'actions',
      title: 'Düymələr',
      render: ({ id }) => (
        <Space>
          <Tooltip title='Redaktə et'>
            <Button
              type='primary'
              icon={<EditOutlined />}
              onClick={() => console.log(`Edit subject: ${id}`)}
            />
          </Tooltip>
          <Tooltip title='Sil'>
            <Button
              type='primary'
              danger
              icon={<DeleteOutlined />}
              onClick={() => console.log(`Delete subject: ${id}`)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const subjectsTableData = useMemo(() => {
    return subjectsData
      ? subjectsData.map((item, index) => {
          return {
            key: index,
            index: index + 1,
            ...item,
          };
        })
      : [];
  }, [subjectsData]);

  const pageButtons = (
    <>
      <Button
        type='primary'
        onClick={() => toggleModal(MODALS.SUBJECTS_FILTER)}
      >
        Filterlə
      </Button>
      <Button
        type='primary'
        onClick={() => toggleModal(MODALS.SUBJECTS_TYPE_CREATE)}
      >
        Əlavə et
      </Button>
    </>
  );

  const pageContent = (
    <>
      <Table
        bordered
        size='small'
        rowClassName={(_, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
        loading={getSubjectsDataLoading}
        columns={subjectsTableColumns}
        dataSource={subjectsTableData}
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

Subjects.propTypes = {};

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
        toggleModal,
        openModal,
        closeModal,
        getSubjectsData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Subjects));

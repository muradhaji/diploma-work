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
import { getProfessionsData } from '../../Redux/Slices/ProfessionSlice';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';
// import styles from './Professions.module.css';

const Professions = ({
  ProfessionSlice,
  toggleModal,
  openModal,
  closeModal,
  getProfessionsData,
}) => {
  const {
    data: professionsData,
    loading: getProfessionsDataLoading,
    // error,
  } = ProfessionSlice || {};

  useEffect(() => {
    getProfessionsData();
    // eslint-disable-next-line
  }, []);

  const professionsTableColumns = [
    {
      key: 'index',
      dataIndex: 'index',
      title: '#',
      fixed: 'left',
    },
    {
      key: 'kod',
      dataIndex: 'kod',
      title: 'Kod',
    },
    {
      key: 'ad',
      dataIndex: 'ad',
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
              onClick={() => console.log(`Edit profession: ${id}`)}
            />
          </Tooltip>
          <Tooltip title='Sil'>
            <Button
              type='primary'
              danger
              icon={<DeleteOutlined />}
              onClick={() => console.log(`Delete profession: ${id}`)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const professionsTableData = useMemo(() => {
    return professionsData
      ? professionsData.map((item, index) => {
          return {
            key: index,
            index: index + 1,
            ...item,
          };
        })
      : [];
  }, [professionsData]);

  const pageButtons = (
    <>
      <Button
        type='primary'
        onClick={() => toggleModal(MODALS.PROFESSION_FILTER)}
      >
        Filterlə
      </Button>
      <Button
        type='primary'
        onClick={() => toggleModal(MODALS.PROFESSION_CREATE)}
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
        loading={getProfessionsDataLoading}
        columns={professionsTableColumns}
        dataSource={professionsTableData}
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

Professions.propTypes = {};

const mapStateToProps = (state) => {
  const { professions: ProfessionSlice = null } = state || {};
  return {
    ProfessionSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        toggleModal,
        openModal,
        closeModal,
        getProfessionsData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Professions));

import React, { memo, useEffect, useMemo } from 'react';
import { Button, Empty, Space, Table, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { MODALS } from '../../constants';
import PageLayout from '../PageLayout';
import { openModal } from '../../Redux/Slices/ModalSlice';
import {
  getArticleTypesData,
  setSelectedArticleType,
} from '../../Redux/Slices/ArticleTypeSlice';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FilterModal from './FilterModal';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
// import PropTypes from 'prop-types';
// import styles from './ArticleTypes.module.css';

const Articles = ({
  ArticleTypeSlice,
  openModal,
  setSelectedArticleType,
  getArticleTypesData,
}) => {
  const {
    data: articleTypesData = null,
    loading: getArticleTypesDataLoading = false,
  } = ArticleTypeSlice || {};

  useEffect(() => {
    getArticleTypesData();
    // eslint-disable-next-line
  }, []);

  const articleTypesTableColumns = [
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
      render: (record) => (
        <Space>
          <Tooltip title='Redaktə et'>
            <Button
              type='primary'
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedArticleType(record);
                openModal(MODALS.ARTICLE_TYPE_EDIT);
              }}
            />
          </Tooltip>
          <Tooltip title='Sil'>
            <Button
              type='primary'
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setSelectedArticleType(record);
                openModal(MODALS.ARTICLE_TYPE_DELETE);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const articleTypesTableData = useMemo(() => {
    return articleTypesData
      ? articleTypesData.map((item, index) => {
          return {
            key: index,
            index: index + 1,
            ...item,
          };
        })
      : [];
  }, [articleTypesData]);

  const pageButtons = (
    <>
      <Button
        type='primary'
        onClick={() => openModal(MODALS.ARTICLE_TYPE_FILTER)}
      >
        Filterlə
      </Button>
      <Button
        type='primary'
        onClick={() => openModal(MODALS.ARTICLE_TYPE_CREATE)}
      >
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
        loading={getArticleTypesDataLoading}
        columns={articleTypesTableColumns}
        dataSource={articleTypesTableData}
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

Articles.propTypes = {};

const mapStateToProps = (state) => {
  const { articleTypes: ArticleTypeSlice = null } = state || {};
  return {
    ArticleTypeSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        openModal,
        setSelectedArticleType,
        getArticleTypesData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Articles));

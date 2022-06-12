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
import { getArticleTypesData } from '../../Redux/Slices/ArticleTypeSlice';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';
// import styles from './ArticleTypes.module.css';

const Articles = ({
  ArticleTypeSlice,
  toggleModal,
  openModal,
  closeModal,
  getArticleTypesData,
}) => {
  const {
    data: articleTypesData,
    loading: getArticleTypesDataLoading,
    // error,
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
      render: ({ id }) => (
        <Space>
          <Tooltip title='Redaktə et'>
            <Button
              type='primary'
              icon={<EditOutlined />}
              onClick={() => console.log(`Edit article type: ${id}`)}
            />
          </Tooltip>
          <Tooltip title='Sil'>
            <Button
              type='primary'
              danger
              icon={<DeleteOutlined />}
              onClick={() => console.log(`Delete article type: ${id}`)}
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
        onClick={() => toggleModal(MODALS.ARTICLE_TYPE_FILTER)}
      >
        Filterlə
      </Button>
      <Button
        type='primary'
        onClick={() => toggleModal(MODALS.ARTICLE_TYPE_CREATE)}
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
        toggleModal,
        openModal,
        closeModal,
        getArticleTypesData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Articles));

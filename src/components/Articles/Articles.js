import React, { memo, useEffect, useMemo } from 'react';
import { Button, Empty, Space, Table, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { MODALS } from './../../constants';
import PageLayout from '../PageLayout';
import { openModal } from '../../Redux/Slices/ModalSlice';
import {
  getArticlesData,
  setSelectedArticle,
} from '../../Redux/Slices/ArticleSlice';
import { getArticleTypesData } from '../../Redux/Slices/ArticleTypeSlice';
import { getTeachersData } from '../../Redux/Slices/TeacherSlice';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import FilterModal from './FilterModal';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
// import PropTypes from 'prop-types';
// import styles from './Articles.module.css';

const Articles = ({
  ArticleSlice,
  ArticleTypeSlice,
  TeacherSlice,
  openModal,
  setSelectedArticle,
  getArticlesData,
  getArticleTypesData,
  getTeachersData,
}) => {
  const { data: articlesData = null, loading: getArticlesDataLoading = false } =
    ArticleSlice || {};

  const {
    data: articleTypesData = null,
    loading: getArticleTypesDataLoading = false,
  } = ArticleTypeSlice || {};

  const { data: teachersData = null, loading: getTeachersDataLoading = false } =
    TeacherSlice || {};

  useEffect(() => {
    getArticlesData();
    getArticleTypesData();
    getTeachersData();
    // eslint-disable-next-line
  }, []);

  const articlesTableColumns = [
    {
      key: 'index',
      dataIndex: 'index',
      title: '#',
      fixed: 'left',
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Ad',
      fixed: 'left',
    },
    {
      key: 'teacher',
      dataIndex: 'teacher',
      title: 'Müəllim',
      render: (teacherId) => {
        const foundItem = find(teachersData, ['id', teacherId]);
        return foundItem
          ? `${foundItem['ad']} ${foundItem['soyad']} ${foundItem['ata_adi']}`
          : teacherId;
      },
    },
    {
      key: 'hem_muellifler',
      dataIndex: 'hem_muellifler',
      title: 'Həm müəlliflər',
    },
    {
      key: 'tipi',
      dataIndex: 'tipi',
      title: 'Tip',
      render: (articleTypeId) => {
        const foundItem = find(articleTypesData, ['id', articleTypeId]);
        return foundItem ? foundItem['adi'] : articleTypeId;
      },
    },
    {
      key: 'cap_olundugu_jurnal',
      dataIndex: 'cap_olundugu_jurnal',
      title: 'Çap olunduğu jurnal',
    },
    {
      key: 'ili',
      dataIndex: 'ili',
      title: 'İl',
    },
    {
      key: 'sehfesi',
      dataIndex: 'sehfesi',
      title: 'Səhifə sayı',
    },
    {
      key: 'index_nom',
      dataIndex: 'index_nom',
      title: 'İndex nömrəsi',
    },
    {
      key: 'meqalenin_cap_oldugu_yer',
      dataIndex: 'meqalenin_cap_oldugu_yer',
      title: 'Çap olunduğu yer',
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
                setSelectedArticle(record);
                openModal(MODALS.ARTICLE_EDIT);
              }}
            />
          </Tooltip>
          <Tooltip title='Sil'>
            <Button
              type='primary'
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setSelectedArticle(record);
                openModal(MODALS.ARTICLE_DELETE);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const articlesTableData = useMemo(() => {
    return articlesData
      ? articlesData.map((item, index) => {
          return {
            key: index,
            index: index + 1,
            ...item,
          };
        })
      : [];
  }, [articlesData]);

  const pageButtons = (
    <>
      <Button type='primary' onClick={() => openModal(MODALS.ARTICLE_FILTER)}>
        Filterlə
      </Button>
      <Button type='primary' onClick={() => openModal(MODALS.ARTICLE_CREATE)}>
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
          getArticlesDataLoading ||
          getArticleTypesDataLoading ||
          getTeachersDataLoading
        }
        columns={articlesTableColumns}
        dataSource={articlesTableData}
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

Articles.propTypes = {};

const mapStateToProps = (state) => {
  const {
    articles: ArticleSlice = null,
    articleTypes: ArticleTypeSlice = null,
    teachers: TeacherSlice = null,
  } = state || {};
  return {
    ArticleSlice,
    ArticleTypeSlice,
    TeacherSlice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(
      {
        openModal,
        setSelectedArticle,
        getArticlesData,
        getArticleTypesData,
        getTeachersData,
      },
      dispatch
    ),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Articles));

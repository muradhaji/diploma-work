import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import { APIS, API_URL, MESSAGES, MODALS } from '../../constants';
import { buildParams } from '../../helperFunctions';
import { closeModal } from './ModalSlice';

// Article model
// const Article = [
//   {
//     id: 'int',
//     name: 'string',
//     hem_muellifler: 'string',
//     cap_olundugu_jurnal: 'string',
//     ili: 'int',
//     sehfesi: 'int',
//     index_nom: 'string',
//     meqalenin_cap_oldugu_yer: 'string',
//     teacher: 'int',
//     tipi: 'int',
//   },
// ];

export const ArticleSlice = createSlice({
  name: 'articles',
  initialState: {
    data: null,
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
    deleteLoading: false,
    deleteError: null,
    selectedArticle: null,
  },
  reducers: {
    getArticlesDataStarted: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    getArticlesDataSucceeded: (state, { payload: articlesData = null }) => {
      if (articlesData) {
        return {
          ...state,
          data: articlesData,
          loading: false,
          error: null,
        };
      }
      return state;
    },

    getArticlesDataFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        loading: false,
        error,
      };
    },

    createArticleStarted: (state) => {
      return {
        ...state,
        createLoading: true,
        createError: null,
      };
    },

    createArticleSucceeded: (state, { payload: newArticleData = null }) => {
      if (newArticleData) {
        return {
          ...state,
          createLoading: false,
          createError: null,
        };
      }
      return state;
    },

    createArticleFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        createLoading: false,
        createError: error,
      };
    },

    updateArticleStarted: (state) => {
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      };
    },

    updateArticleSucceeded: (state, { payload: newArticleData = null }) => {
      if (newArticleData) {
        return {
          ...state,
          updateLoading: false,
          updateError: null,
        };
      }
      return state;
    },

    updateArticleFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        updateLoading: false,
        updateError: error,
      };
    },

    deleteArticleStarted: (state) => {
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
      };
    },

    deleteArticleSucceeded: (state) => {
      return {
        ...state,
        deleteLoading: false,
        deleteError: null,
      };
    },

    deleteArticleFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        deleteLoading: false,
        deleteError: error,
      };
    },

    setSelectedArticle: (state, { payload: selectedArticle = null }) => {
      return {
        ...state,
        selectedArticle,
      };
    },
  },
});

export const getArticlesData =
  (filters = {}) =>
  (dispatch) => {
    dispatch(getArticlesDataStarted());
    axios
      .get(API_URL + APIS.ARTICLES + buildParams(filters))
      .then(({ data }) => {
        dispatch(getArticlesDataSucceeded(data));
      })
      .catch(({ message }) => {
        dispatch(getArticlesDataFailed(message));
      });
  };

export const getFilteredArticlesData =
  (filters = {}) =>
  (dispatch) => {
    dispatch(getArticlesDataStarted());
    axios
      .get(API_URL + APIS.ARTICLES + buildParams(filters))
      .then(({ data }) => {
        dispatch(getArticlesDataSucceeded(data));
        dispatch(closeModal(MODALS.ARTICLE_FILTER));
      })
      .catch(({ message: errMessage }) => {
        message.error(errMessage);
        dispatch(getArticlesDataFailed(errMessage));
      });
  };

export const createArticle = (requestData) => (dispatch) => {
  dispatch(createArticleStarted());
  axios
    .post(API_URL + APIS.ARTICLES, requestData)
    .then(({ data }) => {
      dispatch(createArticleSucceeded(data));
      dispatch(closeModal(MODALS.ARTICLE_CREATE));
      message.success(MESSAGES.ARTICLES.CREATED_SUCCESSFULLY);
      dispatch(getArticlesData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(createArticleFailed(errMessage));
    });
};

export const updateArticle = (articleId, requestData) => (dispatch) => {
  dispatch(updateArticleStarted());
  axios
    .patch(API_URL + APIS.ARTICLES + articleId + '/', requestData)
    .then(({ data }) => {
      dispatch(updateArticleSucceeded(data));
      dispatch(closeModal(MODALS.ARTICLE_EDIT));
      message.success(MESSAGES.ARTICLES.UPDATED_SUCCESSFULLY);
      dispatch(getArticlesData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(updateArticleFailed(errMessage));
    });
};

export const deleteArticle = (articleId) => (dispatch) => {
  dispatch(deleteArticleStarted());
  axios
    .delete(API_URL + APIS.ARTICLES + articleId + '/')
    .then(({ data }) => {
      dispatch(deleteArticleSucceeded(data));
      dispatch(closeModal(MODALS.ARTICLE_DELETE));
      message.success(MESSAGES.ARTICLES.DELETED_SUCCESSFULLY);
      dispatch(getArticlesData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(deleteArticleFailed(errMessage));
    });
};

export default ArticleSlice.reducer;

export const {
  getArticlesDataStarted,
  getArticlesDataSucceeded,
  getArticlesDataFailed,
  createArticleStarted,
  createArticleSucceeded,
  createArticleFailed,
  updateArticleStarted,
  updateArticleSucceeded,
  updateArticleFailed,
  deleteArticleStarted,
  deleteArticleSucceeded,
  deleteArticleFailed,
  setSelectedArticle,
} = ArticleSlice.actions;

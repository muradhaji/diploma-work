import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import { APIS, API_URL, MESSAGES, MODALS } from '../../constants';
import { buildParams } from '../../helperFunctions';
import { closeModal } from './ModalSlice';

// ArticleType model
// const ArticleType = [
//   {
//     id: 'int',
//     adi: 'string',
//   },
// ];

export const ArticleTypeSlice = createSlice({
  name: 'articleTypes',
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
    selectedArticleType: null,
  },
  reducers: {
    getArticleTypesDataStarted: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    getArticleTypesDataSucceeded: (
      state,
      { payload: articleTypesData = null }
    ) => {
      if (articleTypesData) {
        return {
          ...state,
          data: articleTypesData,
          loading: false,
          error: null,
        };
      }
      return state;
    },

    getArticleTypesDataFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        loading: false,
        error,
      };
    },

    createArticleTypeStarted: (state) => {
      return {
        ...state,
        createLoading: true,
        createError: null,
      };
    },

    createArticleTypeSucceeded: (
      state,
      { payload: newArticleTypeData = null }
    ) => {
      if (newArticleTypeData) {
        return {
          ...state,
          createLoading: false,
          createError: null,
        };
      }
      return state;
    },

    createArticleTypeFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        createLoading: false,
        createError: error,
      };
    },

    updateArticleTypeStarted: (state) => {
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      };
    },

    updateArticleTypeSucceeded: (
      state,
      { payload: newArticleTypeData = null }
    ) => {
      if (newArticleTypeData) {
        return {
          ...state,
          updateLoading: false,
          updateError: null,
        };
      }
      return state;
    },

    updateArticleTypeFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        updateLoading: false,
        updateError: error,
      };
    },

    deleteArticleTypeStarted: (state) => {
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
      };
    },

    deleteArticleTypeSucceeded: (state) => {
      return {
        ...state,
        deleteLoading: false,
        deleteError: null,
      };
    },

    deleteArticleTypeFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        deleteLoading: false,
        deleteError: error,
      };
    },

    setSelectedArticleType: (
      state,
      { payload: selectedArticleType = null }
    ) => {
      return {
        ...state,
        selectedArticleType,
      };
    },
  },
});

export const getArticleTypesData =
  (filters = {}) =>
  (dispatch) => {
    dispatch(getArticleTypesDataStarted());
    axios
      .get(API_URL + APIS.ARTICLE_TYPES + buildParams(filters))
      .then(({ data }) => {
        dispatch(getArticleTypesDataSucceeded(data));
      })
      .catch(({ message: errMessage }) => {
        message.error(errMessage);
        dispatch(getArticleTypesDataFailed(errMessage));
      });
  };

export const getFilteredArticleTypesData =
  (filters = {}) =>
  (dispatch) => {
    dispatch(getArticleTypesDataStarted());
    axios
      .get(API_URL + APIS.ARTICLE_TYPES + buildParams(filters))
      .then(({ data }) => {
        dispatch(getArticleTypesDataSucceeded(data));
        dispatch(closeModal(MODALS.ARTICLE_TYPE_FILTER));
      })
      .catch(({ message: errMessage }) => {
        message.error(errMessage);
        dispatch(getArticleTypesDataFailed(errMessage));
      });
  };

export const createArticleType = (requestData) => (dispatch) => {
  dispatch(createArticleTypeStarted());
  axios
    .post(API_URL + APIS.ARTICLE_TYPES, requestData)
    .then(({ data }) => {
      dispatch(createArticleTypeSucceeded(data));
      dispatch(closeModal(MODALS.ARTICLE_TYPE_CREATE));
      message.success(MESSAGES.ARTICLE_TYPES.CREATED_SUCCESSFULLY);
      dispatch(getArticleTypesData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(createArticleTypeFailed(errMessage));
    });
};

export const updateArticleType = (subjectId, requestData) => (dispatch) => {
  dispatch(updateArticleTypeStarted());
  axios
    .patch(API_URL + APIS.ARTICLE_TYPES + subjectId + '/', requestData)
    .then(({ data }) => {
      dispatch(updateArticleTypeSucceeded(data));
      dispatch(closeModal(MODALS.ARTICLE_TYPE_EDIT));
      message.success(MESSAGES.ARTICLE_TYPES.UPDATED_SUCCESSFULLY);
      dispatch(getArticleTypesData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(updateArticleTypeFailed(errMessage));
    });
};

export const deleteArticleType = (subjectId) => (dispatch) => {
  dispatch(deleteArticleTypeStarted());
  axios
    .delete(API_URL + APIS.ARTICLE_TYPES + subjectId + '/')
    .then(({ data }) => {
      dispatch(deleteArticleTypeSucceeded(data));
      dispatch(closeModal(MODALS.ARTICLE_TYPE_DELETE));
      message.success(MESSAGES.ARTICLE_TYPES.DELETED_SUCCESSFULLY);
      dispatch(getArticleTypesData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(deleteArticleTypeFailed(errMessage));
    });
};

export default ArticleTypeSlice.reducer;

export const {
  getArticleTypesDataStarted,
  getArticleTypesDataSucceeded,
  getArticleTypesDataFailed,
  createArticleTypeStarted,
  createArticleTypeSucceeded,
  createArticleTypeFailed,
  updateArticleTypeStarted,
  updateArticleTypeSucceeded,
  updateArticleTypeFailed,
  deleteArticleTypeStarted,
  deleteArticleTypeSucceeded,
  deleteArticleTypeFailed,
  setSelectedArticleType,
} = ArticleTypeSlice.actions;

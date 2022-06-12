import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIS, API_URL } from '../../constants';
import { buildParams } from '../../helperFunctions';

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
      .catch(({ message }) => {
        dispatch(getArticleTypesDataFailed(message));
      });
  };

export default ArticleTypeSlice.reducer;

export const {
  getArticleTypesDataStarted,
  getArticleTypesDataSucceeded,
  getArticleTypesDataFailed,
} = ArticleTypeSlice.actions;

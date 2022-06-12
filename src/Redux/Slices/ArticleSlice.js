import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIS, API_URL } from '../../constants';
import { buildParams } from '../../helperFunctions';

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

export default ArticleSlice.reducer;

export const {
  getArticlesDataStarted,
  getArticlesDataSucceeded,
  getArticlesDataFailed,
} = ArticleSlice.actions;

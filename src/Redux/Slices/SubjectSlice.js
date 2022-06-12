import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIS, API_URL } from '../../constants';
import { buildParams } from '../../helperFunctions';

// Subject model
// const Subjects = [
//   {
//     id: 'int',
//     adi: 'string',
//   },
// ];

export const SubjectSlice = createSlice({
  name: 'subjects',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    getSubjectsDataStarted: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    getSubjectsDataSucceeded: (state, { payload: subjectsData = null }) => {
      if (subjectsData) {
        return {
          ...state,
          data: subjectsData,
          loading: false,
          error: null,
        };
      }
      return state;
    },

    getSubjectsDataFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        loading: false,
        error,
      };
    },
  },
});

export const getSubjectsData =
  (filters = {}) =>
  (dispatch) => {
    dispatch(getSubjectsDataStarted());
    axios
      .get(API_URL + APIS.SUBJECTS + buildParams(filters))
      .then(({ data }) => {
        dispatch(getSubjectsDataSucceeded(data));
      })
      .catch(({ message }) => {
        dispatch(getSubjectsDataFailed(message));
      });
  };

export default SubjectSlice.reducer;

export const {
  getSubjectsDataStarted,
  getSubjectsDataSucceeded,
  getSubjectsDataFailed,
} = SubjectSlice.actions;

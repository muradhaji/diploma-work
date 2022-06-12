import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIS, API_URL } from '../../constants';
import { buildParams } from '../../helperFunctions';

// Profession model
// const Profession = [
//   {
//     id: 'int',
//     kod: 'int',
//     ad: 'string',
//   },
// ];

export const ProfessionSlice = createSlice({
  name: 'professions',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    getProfessionsDataStarted: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    getProfessionsDataSucceeded: (
      state,
      { payload: professionsData = null }
    ) => {
      if (professionsData) {
        return {
          ...state,
          data: professionsData,
          loading: false,
          error: null,
        };
      }
      return state;
    },

    getProfessionsDataFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        loading: false,
        error,
      };
    },
  },
});

export const getProfessionsData =
  (filters = {}) =>
  (dispatch) => {
    dispatch(getProfessionsDataStarted());
    axios
      .get(API_URL + APIS.PROFESSIONS + buildParams(filters))
      .then(({ data }) => {
        dispatch(getProfessionsDataSucceeded(data));
      })
      .catch(({ message }) => {
        dispatch(getProfessionsDataFailed(message));
      });
  };

export default ProfessionSlice.reducer;

export const {
  getProfessionsDataStarted,
  getProfessionsDataSucceeded,
  getProfessionsDataFailed,
} = ProfessionSlice.actions;

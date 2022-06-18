import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import { APIS, API_URL, MESSAGES, MODALS } from '../../constants';
import { buildParams } from '../../helperFunctions';
import { closeModal } from './ModalSlice';

// Profession model
// const Profession = [
//   {
//     id: 'int',
//     kod: 'string',
//     ad: 'string',
//   },
// ];

export const ProfessionSlice = createSlice({
  name: 'professions',
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
    selectedProfession: null,
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

    createProfessionStarted: (state) => {
      return {
        ...state,
        createLoading: true,
        createError: null,
      };
    },

    createProfessionSucceeded: (
      state,
      { payload: newProfessionData = null }
    ) => {
      if (newProfessionData) {
        return {
          ...state,
          createLoading: false,
          createError: null,
        };
      }
      return state;
    },

    createProfessionFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        createLoading: false,
        createError: error,
      };
    },

    updateProfessionStarted: (state) => {
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      };
    },

    updateProfessionSucceeded: (
      state,
      { payload: newProfessionData = null }
    ) => {
      if (newProfessionData) {
        return {
          ...state,
          updateLoading: false,
          updateError: null,
        };
      }
      return state;
    },

    updateProfessionFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        updateLoading: false,
        updateError: error,
      };
    },

    deleteProfessionStarted: (state) => {
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
      };
    },

    deleteProfessionSucceeded: (state) => {
      return {
        ...state,
        deleteLoading: false,
        deleteError: null,
      };
    },

    deleteProfessionFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        deleteLoading: false,
        deleteError: error,
      };
    },

    setSelectedProfession: (state, { payload: selectedProfession = null }) => {
      return {
        ...state,
        selectedProfession,
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
      .catch(({ message: errMessage }) => {
        message.error(errMessage);
        dispatch(getProfessionsDataFailed(errMessage));
      });
  };

export const getFilteredProfessionsData =
  (filters = {}) =>
  (dispatch) => {
    dispatch(getProfessionsDataStarted());
    axios
      .get(API_URL + APIS.PROFESSIONS + buildParams(filters))
      .then(({ data }) => {
        dispatch(getProfessionsDataSucceeded(data));
        dispatch(closeModal(MODALS.PROFESSION_FILTER));
      })
      .catch(({ message: errMessage }) => {
        message.error(errMessage);
        dispatch(getProfessionsDataFailed(errMessage));
      });
  };

export const createProfession = (requestData) => (dispatch) => {
  dispatch(createProfessionStarted());
  axios
    .post(API_URL + APIS.PROFESSIONS, requestData)
    .then(({ data }) => {
      dispatch(createProfessionSucceeded(data));
      dispatch(closeModal(MODALS.PROFESSION_CREATE));
      message.success(MESSAGES.PROFESSIONS.CREATED_SUCCESSFULLY);
      dispatch(getProfessionsData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(createProfessionFailed(errMessage));
    });
};

export const updateProfession = (professionId, requestData) => (dispatch) => {
  dispatch(updateProfessionStarted());
  axios
    .patch(API_URL + APIS.PROFESSIONS + professionId + '/', requestData)
    .then(({ data }) => {
      dispatch(updateProfessionSucceeded(data));
      dispatch(closeModal(MODALS.PROFESSION_EDIT));
      message.success(MESSAGES.PROFESSIONS.UPDATED_SUCCESSFULLY);
      dispatch(getProfessionsData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(updateProfessionFailed(errMessage));
    });
};

export const deleteProfession = (professionId) => (dispatch) => {
  dispatch(deleteProfessionStarted());
  axios
    .delete(API_URL + APIS.PROFESSIONS + professionId + '/')
    .then(({ data }) => {
      dispatch(deleteProfessionSucceeded(data));
      dispatch(closeModal(MODALS.PROFESSION_DELETE));
      message.success(MESSAGES.PROFESSIONS.DELETED_SUCCESSFULLY);
      dispatch(getProfessionsData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(deleteProfessionFailed(errMessage));
    });
};

export default ProfessionSlice.reducer;

export const {
  getProfessionsDataStarted,
  getProfessionsDataSucceeded,
  getProfessionsDataFailed,
  createProfessionStarted,
  createProfessionSucceeded,
  createProfessionFailed,
  updateProfessionStarted,
  updateProfessionSucceeded,
  updateProfessionFailed,
  deleteProfessionStarted,
  deleteProfessionSucceeded,
  deleteProfessionFailed,
  setSelectedProfession,
} = ProfessionSlice.actions;

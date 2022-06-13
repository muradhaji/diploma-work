import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import { APIS, API_URL, MESSAGES, MODALS } from '../../constants';
import { buildParams } from '../../helperFunctions';
import { closeModal } from './ModalSlice';

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
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
    deleteLoading: false,
    deleteError: null,
    selectedSubject: null,
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

    createSubjectStarted: (state) => {
      return {
        ...state,
        createLoading: true,
        createError: null,
      };
    },

    createSubjectSucceeded: (state, { payload: newSubjectData = null }) => {
      if (newSubjectData) {
        return {
          ...state,
          createLoading: false,
          createError: null,
        };
      }
      return state;
    },

    createSubjectFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        createLoading: false,
        createError: error,
      };
    },

    updateSubjectStarted: (state) => {
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      };
    },

    updateSubjectSucceeded: (state, { payload: newSubjectData = null }) => {
      if (newSubjectData) {
        return {
          ...state,
          updateLoading: false,
          updateError: null,
        };
      }
      return state;
    },

    updateSubjectFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        updateLoading: false,
        updateError: error,
      };
    },

    deleteSubjectStarted: (state) => {
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
      };
    },

    deleteSubjectSucceeded: (state) => {
      return {
        ...state,
        deleteLoading: false,
        deleteError: null,
      };
    },

    deleteSubjectFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        deleteLoading: false,
        deleteError: error,
      };
    },

    setSelectedSubject: (state, { payload: selectedSubject = null }) => {
      return {
        ...state,
        selectedSubject,
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
      .catch(({ message: errMessage }) => {
        message.error(errMessage);
        dispatch(getSubjectsDataFailed(errMessage));
      });
  };

export const getFilteredSubjectsData =
  (filters = {}) =>
  (dispatch) => {
    dispatch(getSubjectsDataStarted());
    axios
      .get(API_URL + APIS.SUBJECTS + buildParams(filters))
      .then(({ data }) => {
        dispatch(getSubjectsDataSucceeded(data));
        dispatch(closeModal(MODALS.SUBJECT_FILTER));
      })
      .catch(({ message: errMessage }) => {
        message.error(errMessage);
        dispatch(getSubjectsDataFailed(errMessage));
      });
  };

export const createSubject = (requestData) => (dispatch) => {
  dispatch(createSubjectStarted());
  axios
    .post(API_URL + APIS.SUBJECTS, requestData)
    .then(({ data }) => {
      dispatch(createSubjectSucceeded(data));
      dispatch(closeModal(MODALS.SUBJECT_CREATE));
      message.success(MESSAGES.SUBJECTS.CREATED_SUCCESSFULLY);
      dispatch(getSubjectsData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(createSubjectFailed(errMessage));
    });
};

export const updateSubject = (subjectId, requestData) => (dispatch) => {
  dispatch(updateSubjectStarted());
  axios
    .patch(API_URL + APIS.SUBJECTS + subjectId + '/', requestData)
    .then(({ data }) => {
      dispatch(updateSubjectSucceeded(data));
      dispatch(closeModal(MODALS.SUBJECT_EDIT));
      message.success(MESSAGES.SUBJECTS.UPDATED_SUCCESSFULLY);
      dispatch(getSubjectsData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(updateSubjectFailed(errMessage));
    });
};

export const deleteSubject = (subjectId) => (dispatch) => {
  dispatch(deleteSubjectStarted());
  axios
    .delete(API_URL + APIS.SUBJECTS + subjectId + '/')
    .then(({ data }) => {
      dispatch(deleteSubjectSucceeded(data));
      dispatch(closeModal(MODALS.SUBJECT_DELETE));
      message.success(MESSAGES.SUBJECTS.DELETED_SUCCESSFULLY);
      dispatch(getSubjectsData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(deleteSubjectFailed(errMessage));
    });
};

export default SubjectSlice.reducer;

export const {
  getSubjectsDataStarted,
  getSubjectsDataSucceeded,
  getSubjectsDataFailed,
  createSubjectStarted,
  createSubjectSucceeded,
  createSubjectFailed,
  updateSubjectStarted,
  updateSubjectSucceeded,
  updateSubjectFailed,
  deleteSubjectStarted,
  deleteSubjectSucceeded,
  deleteSubjectFailed,
  setSelectedSubject,
} = SubjectSlice.actions;

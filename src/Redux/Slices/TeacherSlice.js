import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import { APIS, API_URL, MESSAGES, MODALS } from '../../constants';
import { buildParams } from '../../helperFunctions';
import { closeModal } from './ModalSlice';

// Teacher model
// const Teachers = [
//   {
//     id: 'int',
//     ad: 'string' -> required,
//     soyad: 'string' -> required,
//     ata_adi: 'string' -> required,
//     gender: 'string' -> ['Kisi','Qadin'],
//     tehsil: 'string' -> required -> ['Bakalavr', 'Magistr', 'Doktorant'],
//     elmi_derece: 'string' -> ['Felsefe doktoru', 'Elmler doktoru'],
//     vezife: 'string' -> ['Professor','Dosent','Bas muellim','Assistent'],
//     fenler: 'array',
//     bolme: 'string' -> required -> ['AZE','RUS','ENG'],
//     dogum_tarixi: 'string',
//     doguldugu_yer: 'string',
//     qeydiyatda_oldugu_unvan: 'string' -> required,
//     faktiki_yasaadigi_unvan: 'string' -> required,
//     bitirdiyi_universitet: 'string' -> required,
//     ixtisas: 'int' -> required,
//     aile_vezyeti: 'string' -> required -> ['Evli','Subay'],
//     partiya_mensubiyeti: 'string',
//     main_work: 'string',
//     herbi_mukellefiyet: 'boolean' -> required,
//     elmi_meqalelerin_sayi: 'string',
//   },
// ];

export const TeacherSlice = createSlice({
  name: 'teachers',
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
    selectedTeacher: null,
  },
  reducers: {
    getTeachersDataStarted: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    getTeachersDataSucceeded: (state, { payload: teachersData = null }) => {
      if (teachersData) {
        return {
          ...state,
          data: teachersData,
          loading: false,
          error: null,
        };
      }
      return state;
    },

    getTeachersDataFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        loading: false,
        error,
      };
    },

    createTeacherStarted: (state) => {
      return {
        ...state,
        createLoading: true,
        createError: null,
      };
    },

    createTeacherSucceeded: (state, { payload: newTeacherData = null }) => {
      if (newTeacherData) {
        return {
          ...state,
          createLoading: false,
          createError: null,
        };
      }
      return state;
    },

    createTeacherFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        createLoading: false,
        createError: error,
      };
    },

    updateTeacherStarted: (state) => {
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      };
    },

    updateTeacherSucceeded: (state, { payload: newTeacherData = null }) => {
      if (newTeacherData) {
        return {
          ...state,
          updateLoading: false,
          updateError: null,
        };
      }
      return state;
    },

    updateTeacherFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        updateLoading: false,
        updateError: error,
      };
    },

    deleteTeacherStarted: (state) => {
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
      };
    },

    deleteTeacherSucceeded: (state) => {
      return {
        ...state,
        deleteLoading: false,
        deleteError: null,
      };
    },

    deleteTeacherFailed: (state, { payload: error = null }) => {
      return {
        ...state,
        deleteLoading: false,
        deleteError: error,
      };
    },

    setSelectedTeacher: (state, { payload: selectedTeacher = null }) => {
      return {
        ...state,
        selectedTeacher,
      };
    },
  },
});

export const getTeachersData =
  (filters = {}) =>
  (dispatch) => {
    dispatch(getTeachersDataStarted());
    axios
      .get(API_URL + APIS.TEACHERS + buildParams(filters))
      .then(({ data }) => {
        dispatch(getTeachersDataSucceeded(data));
      })
      .catch(({ message: errMessage }) => {
        message.error(errMessage);
        dispatch(getTeachersDataFailed(errMessage));
      });
  };

export const getFilteredTeachersData =
  (filters = {}) =>
  (dispatch) => {
    dispatch(getTeachersDataStarted());
    axios
      .get(API_URL + APIS.TEACHERS + buildParams(filters))
      .then(({ data }) => {
        dispatch(getTeachersDataSucceeded(data));
        dispatch(closeModal(MODALS.TEACHER_FILTER));
      })
      .catch(({ message: errMessage }) => {
        message.error(errMessage);
        dispatch(getTeachersDataFailed(errMessage));
      });
  };

export const createTeacher = (requestData) => (dispatch) => {
  dispatch(createTeacherStarted());
  axios
    .post(API_URL + APIS.TEACHERS, requestData)
    .then(({ data }) => {
      dispatch(createTeacherSucceeded(data));
      dispatch(closeModal(MODALS.TEACHER_CREATE));
      message.success(MESSAGES.TEACHERS.CREATED_SUCCESSFULLY);
      dispatch(getTeachersData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(createTeacherFailed(errMessage));
    });
};

export const updateTeacher = (teacherId, requestData) => (dispatch) => {
  dispatch(updateTeacherStarted());
  axios
    .patch(API_URL + APIS.TEACHERS + teacherId + '/', requestData)
    .then(({ data }) => {
      dispatch(updateTeacherSucceeded(data));
      dispatch(closeModal(MODALS.TEACHER_EDIT));
      message.success(MESSAGES.TEACHERS.UPDATED_SUCCESSFULLY);
      dispatch(getTeachersData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(updateTeacherFailed(errMessage));
    });
};

export const deleteTeacher = (teacherId) => (dispatch) => {
  dispatch(deleteTeacherStarted());
  axios
    .delete(API_URL + APIS.TEACHERS + teacherId + '/')
    .then(({ data }) => {
      dispatch(deleteTeacherSucceeded(data));
      dispatch(closeModal(MODALS.TEACHER_DELETE));
      message.success(MESSAGES.TEACHERS.DELETED_SUCCESSFULLY);
      dispatch(getTeachersData());
    })
    .catch(({ message: errMessage }) => {
      message.error(errMessage);
      dispatch(deleteTeacherFailed(errMessage));
    });
};

export default TeacherSlice.reducer;

export const {
  getTeachersDataStarted,
  getTeachersDataSucceeded,
  getTeachersDataFailed,
  createTeacherStarted,
  createTeacherSucceeded,
  createTeacherFailed,
  updateTeacherStarted,
  updateTeacherSucceeded,
  updateTeacherFailed,
  deleteTeacherStarted,
  deleteTeacherSucceeded,
  deleteTeacherFailed,
  setSelectedTeacher,
} = TeacherSlice.actions;

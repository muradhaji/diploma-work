import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIS, API_URL } from '../../constants';
import { buildParams } from '../../helperFunctions';

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
      .catch(({ message }) => {
        dispatch(getTeachersDataFailed(message));
      });
  };

export default TeacherSlice.reducer;

export const {
  getTeachersDataStarted,
  getTeachersDataSucceeded,
  getTeachersDataFailed,
} = TeacherSlice.actions;

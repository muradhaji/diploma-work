import { createSlice } from '@reduxjs/toolkit';
import { find } from 'lodash';

export const ModalSlice = createSlice({
  name: 'modals',
  initialState: [],
  reducers: {
    toggleModal: (state, { payload: modalName = null }) => {
      if (modalName) {
        const isOpen = find(state, (findItem) => findItem === modalName);
        return isOpen
          ? state.filter((filterItem) => filterItem !== modalName)
          : [...state, modalName];
      }
      return state;
    },
    openModal: (state, { payload: modalName = null }) => {
      if (modalName) {
        const isOpen = find(state, (findItem) => findItem === modalName);
        if (!isOpen) {
          return [...state, modalName];
        }
      }
      return state;
    },
    closeModal: (state, { payload: modalName = null }) => {
      if (modalName) {
        const isOpen = find(state, (findItem) => findItem === modalName);
        if (isOpen) {
          return state.filter((filterItem) => filterItem !== modalName);
        }
      }
      return state;
    },
  },
});

export const { toggleModal, openModal, closeModal } = ModalSlice.actions;

export default ModalSlice.reducer;

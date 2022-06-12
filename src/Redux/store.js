import { configureStore } from '@reduxjs/toolkit';
import ModalSlice from './Slices/ModalSlice';
import SubjectSlice from './Slices/SubjectSlice';
import TeacherSlice from './Slices/TeacherSlice';
import ProfessionSlice from './Slices/ProfessionSlice';
import ArticleSlice from './Slices/ArticleSlice';
import ArticleTypeSlice from './Slices/ArticleTypeSlice';

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    modals: ModalSlice,
    teachers: TeacherSlice,
    subjects: SubjectSlice,
    professions: ProfessionSlice,
    articles: ArticleSlice,
    articleTypes: ArticleTypeSlice,
  },
});

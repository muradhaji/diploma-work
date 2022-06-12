export const API_URL = 'http://94.130.176.68:8070/api';

export const APIS = {
  TEACHERS: '/teacher/',
  SUBJECTS: '/fen/',
  PROFESSIONS: '/ixtisas/',
  ARTICLES: '/meqale/',
  ARTICLE_TYPES: '/meqale-tipi/',
};

export const MODALS = {
  TEACHER_FILTER: 'TEACHERS_FILTER',
  TEACHER_CREATE: 'TEACHER_CREATE',
  TEACHER_EDIT: 'TEACHER_EDIT',
  TEACHER_DELETE: 'TEACHER_DELETE',
  ARTICLE_FILTER: 'ARTICLE_FILTER',
  ARTICLE_CREATE: 'ARTICLE_CREATE',
  ARTICLE_EDIT: 'ARTICLE_EDIT',
  ARTICLE_DELETE: 'ARTICLE_DELETE',
  PROFESSION_FILTER: 'PROFESSION_FILTER',
  PROFESSION_CREATE: 'PROFESSION_CREATE',
  PROFESSION_EDIT: 'PROFESSION_EDIT',
  PROFESSION_DELETE: 'PROFESSION_DELETE',
  ARTICLE_TYPE_FILTER: 'ARTICLE_TYPE_FILTER',
  ARTICLE_TYPE_CREATE: 'ARTICLE_TYPE_CREATE',
  ARTICLE_TYPE_EDIT: 'ARTICLE_TYPE_EDIT',
  ARTICLE_TYPE_DELETE: 'ARTICLE_TYPE_DELETE',
  SUBJECTS_FILTER: 'SUBJECTS_FILTER',
  SUBJECTS_TYPE_CREATE: 'SUBJECTS_CREATE',
  SUBJECTS_TYPE_EDIT: 'SUBJECTS_EDIT',
  SUBJECTS_TYPE_DELETE: 'SUBJECTS_DELETE',
};

export const STATICS = {
  TEACHER: {
    tehsil: {
      bakalavr: 'Bakalavr',
      migistr: 'Magistr',
      doktorant: 'Doktorant',
    },
    elmi_derece: {
      fd: 'Fəlsəfə doktoru',
      ed: 'Elmlər doktoru',
    },
    vezife: {
      assis: 'Assistent',
      bm: 'Baş müəllim',
      d: 'Dossent',
      p: 'Professor',
    },
    gender: {
      k: 'Kişi',
      q: 'Qadın',
    },
    bolme: {
      az: 'AZE',
      ru: 'RUS',
      eng: 'ENG',
    },
    aile_vezyeti: {
      e: 'Evli',
      s: 'Subay',
    },
  },
};

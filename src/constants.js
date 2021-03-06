export const API_URL = 'http://94.130.176.68:8070/api';

export const APIS = {
  TEACHERS: '/teacher/',
  ARTICLES: '/meqale/',
  PROFESSIONS: '/ixtisas/',
  ARTICLE_TYPES: '/meqale-tipi/',
  SUBJECTS: '/fen/',
};

export const MESSAGES = {
  TEACHERS: {
    CREATED_SUCCESSFULLY: 'Müəllim uğurla yaradıldı.',
    UPDATED_SUCCESSFULLY: 'Müəllim uğurla redaktə edildi.',
    DELETED_SUCCESSFULLY: 'Müəllim uğurla silindi.',
  },
  ARTICLES: {
    CREATED_SUCCESSFULLY: 'Məqalə uğurla yaradıldı.',
    UPDATED_SUCCESSFULLY: 'Məqalə uğurla redaktə edildi.',
    DELETED_SUCCESSFULLY: 'Məqalə uğurla silindi.',
  },
  PROFESSIONS: {
    CREATED_SUCCESSFULLY: 'İxtisas uğurla yaradıldı.',
    UPDATED_SUCCESSFULLY: 'İxtisas uğurla redaktə edildi.',
    DELETED_SUCCESSFULLY: 'İxtisas uğurla silindi.',
  },
  ARTICLE_TYPES: {
    CREATED_SUCCESSFULLY: 'Məqalə tipi uğurla yaradıldı.',
    UPDATED_SUCCESSFULLY: 'Məqalə tipi uğurla redaktə edildi.',
    DELETED_SUCCESSFULLY: 'Məqalə tipi uğurla silindi.',
  },
  SUBJECTS: {
    CREATED_SUCCESSFULLY: 'Fənn uğurla yaradıldı.',
    UPDATED_SUCCESSFULLY: 'Fənn uğurla redaktə edildi.',
    DELETED_SUCCESSFULLY: 'Fənn uğurla silindi.',
  },
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
  SUBJECT_FILTER: 'SUBJECT_FILTER',
  SUBJECT_CREATE: 'SUBJECT_CREATE',
  SUBJECT_EDIT: 'SUBJECT_EDIT',
  SUBJECT_DELETE: 'SUBJECT_DELETE',
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

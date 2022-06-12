import { map, toNumber } from 'lodash';
import moment from 'moment';

export const buildParams = (data) => {
  const params = new URLSearchParams();

  map(data, (value, key) => {
    if (Array.isArray(data[key])) {
      map(value, (item) => params.append(key, item));
    } else {
      params.append(key, value);
    }
  });

  return '?' + params;
};

export const normalizeFilterData = (data) => {
  const generatedData = {};

  map(data, (value, key) => {
    if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
      generatedData[key] = value;
      if (moment.isMoment(value)) {
        if (key === 'dogum_tarixi') {
          generatedData[key] = moment(value).format('DD.MM.YYYY');
        }
        if (key === 'ili') {
          generatedData[key] = toNumber(moment(value).format('YYYY'));
        }
      }
    }
  });

  return generatedData;
};

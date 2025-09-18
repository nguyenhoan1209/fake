import type { TablePaginationConfig } from 'antd';


export * from './router';

export const FOOTER_CONTENT = '2024 MyID';
export const COLOR_PRIMARY = 'rgba(37, 99, 235, 1)';

export const KEY_ACCESS_TOKEN = 'S0VZX0FDQ0VTU19UT0VLTg==';
export const KEY_AUTH_INFORMATION = 'S0VZX0FVVEhfSU5GT01BVElPTg==';
export const KEY_SEED_PHRASE = 'eyefire.com';
export const KEY_LANGUAGE = 'S0VZX0xBTkdVQUdF';

export const LANGUAGE_VI = 'vi';
export const LANGUAGE_EN = 'en';
export const KEY_FORM_IMAGE = 'image';

export const TYPE_FORMAT_DATE_ASIA_HO_CHI_MINH = 'DD/MM/YYYY';
export const TYPE_FORMAT_DATE_ASIA_HO_CHI_MINH_01 = 'DD/MM';
export const TYPE_FORMAT_DATE_TIME_ASIA_HO_CHI_MINH_01 = 'DD/MM/YYYY HH:mm:ss';
export const TYPE_FORMAT_DATE_TIME_ASIA_HO_CHI_MINH_02 = 'HH:mm:ss DD/MM/YYYY';
export const TYPE_FORMAT_DATE_TIME_ASIA_HO_CHI_MINH_03 = 'DD/MM/YYYY HH:mm';
export const TYPE_FORMAT_DATE_TIME_ASIA_HO_CHI_MINH_04 = 'YYYY-MM-DD HH:mm:ss';
export const TYPE_FORMAT_DATE_TIME_ASIA_HO_CHI_MINH_05 = 'YYYY_MM_DD_HHmmss';
export const TYPE_FORMAT_TIME_ASIA_HO_CHI_MINH = 'HH:mm:ss';
export const TYPE_FORMAT_TIME_ASIA_HO_CHI_MINH_01 = 'HH:mm';
export const TYPE_FORMAT_DATE_SEND_REQUEST_SERVER = 'YYYY-MM-DD';
export const TYPE_FORMAT_DATE_SEND_REQUEST_SERVER_01 = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
export const TYPE_FORMAT_DATE_SEND_REQUEST_SERVER_02 = 'YYYY-MM-DD HH:mm:ss';
export const TYPE_FORMAT_DATE_SEND_REQUEST_SERVER_03 = 'YYYY-MM-DDTHH:mm:ss';

// export const REGEX_PHONE = /^(((\+|)84)|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
export const TYPE_FORMAT_HOUR_ASIA_HO_CHI_MINH = 'HH';
export const TYPE_FORMAT_MINUTE_ASIA_HO_CHI_MINH = 'mm';

export const REGEX = {
  // eslint-disable-next-line no-useless-escape
  PHONE: /^[\+\d]{0,1}\d{7,15}$/gm,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()]).{8,}$/,
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NO_ALL_SPACE: /[^\s]+/g,
} as const;

export const PAGE_SIZE_TABLE = 20;

export const TYPE_FILE_EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || '';

export const PAGINATION_TABLE_CONFIG: TablePaginationConfig = {
  pageSize: PAGE_SIZE_TABLE,
  showLessItems: true,
  showSizeChanger: false,
};

export const KEY_ACTIVE_LICENSE_FROALA_EDITOR = import.meta.env.VITE_KEY_ACTIVE_LICENSE_FROALA_EDITOR;

export enum APP {
  ADMIN,
  PROVIDER,
}

export const NETWORK_CONFIG = {
  TIMEOUT: 30000,
  USE_TOKEN: true,
  WITH_CREDENTIALS: import.meta.env.VITE_WITH_CREDENTIALS === 'true',
} as const;

export enum STATUS {
  INACTIVE,
  ACTIVE,
}

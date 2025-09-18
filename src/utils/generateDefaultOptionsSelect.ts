import type { SelectProps } from 'antd';

import { LANGUAGE_VI } from 'config/constants';
import getLanguage from './getLanguage';

const generateDefaultOptionsSelect = (defaultOptions?: SelectProps['options']): SelectProps['options'] => {
  return defaultOptions && defaultOptions.length > 0
    ? defaultOptions
    : [
        {
          label: getLanguage() === LANGUAGE_VI ? '--Không chọn--' : '-- Not selected --',
          value: null,
        },
      ];
};

export default generateDefaultOptionsSelect;

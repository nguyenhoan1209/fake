import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, InputProps } from 'antd';
import { useTranslation } from 'react-i18next';

export const InputSearchGlobal = ({ ...props }: InputProps) => {
  const { t } = useTranslation();
  return (
    <Input
      allowClear
      placeholder={t('enter_search')}
      suffix={<FontAwesomeIcon icon={faSearch} />}
      className={`w-full ${props.className}`}
      {...props}
    />
  );
};

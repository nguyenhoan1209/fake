import { SelectProps } from 'antd/lib';
import { SelectGlobal } from 'components/custom/Select';
import { t } from 'i18next';

const statusOption = [
  {
    label: t('agent'),
    value: '1',
  },
  {
    label: t('agent'),
    value: '2',
  },
];

const SelectAgent = (props: SelectProps) => {
  return <SelectGlobal options={statusOption} {...props} style={{ width: '200px' }} />;
};

export default SelectAgent;

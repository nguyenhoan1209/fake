import { SelectProps } from 'antd/lib';
import { SelectGlobal } from 'components/custom/Select';
import { ICStatus } from 'components/icon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Status } from 'types';

const map = {
  [Status.ACTIVE]: 'active',
  [Status.INACTIVE]: 'inactive',
};

const useStatusValues = () => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      Object.keys(map).map((item) => {
        return {
          label: t(
            map[
              item as unknown as keyof {
                [key in Status]: string;
              }
            ],
          ),
          value: Number(item),
        };
      }),
    [t],
  );
};

const DisplayStatus = ({ value }: { value: Status }) => {
  return <ICStatus className={value === Status.ACTIVE ? 'text-primary' : 'text-gray-500'} />;
};

const SelectStatus = (props: SelectProps) => {
  const { t } = useTranslation();
  const statusOption = useStatusValues();
  return (
    <SelectGlobal
      placeholder={t('placeholder.select_field', { field: t('status') })}
      options={statusOption}
      {...props}
    />
  );
};

export { DisplayStatus, SelectStatus };


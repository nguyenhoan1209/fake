import type { FC } from 'react';

import type { NumberSelectionProps } from 'types/components';

import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const NumberSelection: FC<NumberSelectionProps> = memo(({ selectedRowKeys, className, onClick }) => {
  const { t } = useTranslation();

  return (
    <>
      {selectedRowKeys.flat().length > 0 && (
        <div
          className={`flex h-8 items-center justify-center rounded border bg-[#DCF5E1] px-2 text-[#2DA74E] cursor-pointer${
            className?.trim() ? ` ${className}` : ''
          }`}
          onClick={onClick}
        >
          <span>
            {selectedRowKeys.flat().length}&nbsp;{t('selected')}
          </span>
          <span className="font-meium ml-4 text-lg">x</span>
        </div>
      )}
    </>
  );
});

export default NumberSelection;

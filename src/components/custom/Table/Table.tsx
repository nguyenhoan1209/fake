/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TableProps } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

import { Table } from 'antd';

import { PAGE_SIZE_TABLE } from 'config/constants';
import { useWindowSize } from 'hooks';

import { DeleteIcon, ViewIcon } from 'components/icon';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import cSSModuleClasses from './Global.module.scss';

function TableGlobal<T extends Record<any, any>>({
  rowKey = 'id',
  className,
  defaultPageSize = PAGE_SIZE_TABLE,
  subtractHeight = 300,
  scroll,
  currentPage,
  totalItems,
  rowSelection,
  ...props
}: TableProps<T> & {
  columns: ColumnsType<T> | undefined;
  currentPage: number | undefined;
  defaultPageSize?: number;
  totalItems: number | undefined;
  subtractHeight?: number;
  hasNumericalOrder?: boolean;
}) {
  const { height } = useWindowSize();
  const { t } = useTranslation();

  return (
    <Table<T>
      className={`${cSSModuleClasses['ant-table-global']} ${className} `}
      size="small"
      rowKey={rowKey}
      pagination={{
        total: totalItems,
        pageSize: defaultPageSize,
        current: currentPage !== undefined ? currentPage + 1 : undefined, // api return page begin from 0
        showTotal: (total) => `${t('total')}: ${total}`,
      }}
      rowSelection={
        rowSelection
          ? {
              ...rowSelection,
              fixed: 'left',
              columnWidth: 50,
            }
          : undefined
      }
      scroll={{
        x: scroll?.x ?? 1024,
        y: subtractHeight ? height - subtractHeight : undefined,
      }}
      {...props}
    />
  );
}

export const ActionsRow = ({
  onUpdate,
  onDelete,
  additionalActions,
}: {
  onUpdate: () => void;
  onDelete: () => void;
  additionalActions?: { children: ReactNode }[];
}) => {
  const { t } = useTranslation();

  const actions = [
    {
      children: (
        <button
          title={t('see_details')}
          className="place-content-center rounded-md border border-blue-200 bg-white px-2 py-1 text-primary hover:bg-primary hover:text-white"
          onClick={onUpdate}
        >
          <ViewIcon />
        </button>
      ),
    },
    {
      children: (
        <button
          title={t('delete')}
          className="place-content-center rounded-md border border-blue-200 bg-white px-2 py-1 text-red-500 hover:bg-red-500 hover:text-white"
          onClick={onDelete}
        >
          <DeleteIcon />
        </button>
      ),
    },
    ...(additionalActions ?? []),
  ];

  return <div className="flex place-content-center gap-2">{actions.map((action) => action.children)}</div>;
};

export default TableGlobal;

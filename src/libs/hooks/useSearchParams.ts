/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { useDebounce } from 'hooks';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

type StateHook<T extends Record<any, any>, U> = {
  params: T;
  setParams: Dispatch<SetStateAction<T>>;
  searchValue?: string;
  setSearchValue: Dispatch<SetStateAction<string | undefined>>;
  handleChangePagination: (
    pagination: TablePaginationConfig,
    filters?: Record<string, FilterValue | null>,
    sorter?: SorterResult<U> | SorterResult<U>[],
  ) => void;
};

type DebounceHook = [string | undefined, Dispatch<SetStateAction<string | undefined>>];

const useDebounceSearch = (initialValue?: string): DebounceHook => {
  const [searchValue, setSearchValue] = useState(initialValue);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  return [debouncedSearchValue, setSearchValue];
};

const useSearchParams = <T extends Record<any, any>, U = any>(initialValue: T): StateHook<T, U> => {
  const [searchValue, setSearchValue] = useDebounceSearch();
  const [params, setParams] = useState<T>(initialValue);

  useEffect(() => {
    if (searchValue !== undefined) {
      setParams((params) => ({
        ...params,
        searchKeyword: searchValue,
        page: 0,
      }));
    }
  }, [searchValue]);

  const getSortString = (sorters: SorterResult<U>[]) => {
    return sorters
      .map((item) => {
        switch (item.order) {
          case 'ascend':
            return item.field;
          case 'descend':
            return `-${item.field}`;
          default:
            return '';
        }
      })
      .join(',');
  };

  const handleChangePagination = useCallback(
    (
      pagination: TablePaginationConfig,
      _?: Record<string, FilterValue | null>,
      sorter?: SorterResult<U> | SorterResult<U>[],
    ) => {
      if (!sorter) {
        setParams((p) => ({
          ...p,
          page: pagination.current,
        }));
        return;
      }

      const sorters = Array.isArray(sorter) ? sorter : [sorter];
      const sortString = getSortString(sorters);
      setParams((p) => ({
        ...p,
        page: pagination.current,
        sort: sortString || '-id',
      }));
    },
    [],
  );

  return {
    params,
    setParams,
    searchValue,
    setSearchValue,
    handleChangePagination,
  };
};

export default useSearchParams;

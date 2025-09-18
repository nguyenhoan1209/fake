import { ConfigProvider, notification } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { COLOR_PRIMARY } from 'config/constants/index.ts';
import store from 'store';
import App from './App.tsx';

import 'dayjs/locale/vi';

import './i18n';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './styles/index.scss';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.locale('vi');
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      notification.error(error);
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: COLOR_PRIMARY,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>,
);

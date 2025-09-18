import { ConfigProvider } from 'antd';
import enLocale from 'antd/locale/en_US';
import viLocale from 'antd/locale/vi_VN';
import { COLOR_PRIMARY, KEY_LANGUAGE, LANGUAGE_VI } from 'config/constants';
import { RouterProvider } from 'react-router-dom';
import { routers } from 'routes';

function App() {
  return (
    <ConfigProvider
      locale={
        window.localStorage.getItem(KEY_LANGUAGE)
          ? window.localStorage.getItem(KEY_LANGUAGE) === LANGUAGE_VI
            ? viLocale
            : enLocale
          : viLocale
      }
      theme={{
        token: {
          colorPrimary: COLOR_PRIMARY,
        },
        hashed: false,
      }}
    >
      <RouterProvider router={routers} />
    </ConfigProvider>
  );
}

export default App;

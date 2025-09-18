import AuthLayout from 'components/Layout/Auth';
import DashboardLayout from 'components/Layout/Dashboard';
import { PrivateRoute } from 'components/Layout/Dashboard/PrivateRoute';
import { KEY_AUTH_INFORMATION, PRIVATE_ROUTERS, PUBLIC_ROUTERS } from 'config/constants';
import { LoginPage } from 'pages/auth';
import { NotFoundPage } from 'pages/NotFound';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import OverviewPage from 'pages/admin/Overview';
import { useSelector } from 'react-redux';
import { loginUser, setUserProfile } from 'store/slices/userSlice';
import { RootState } from 'types/store';
import { set } from 'zod';

export const navigateToPublicRoute = () => PUBLIC_ROUTERS.LOGIN;
export const navigateToPrivateRoute = () => {
  // You may want to check user role/type in user.login if needed
  return PRIVATE_ROUTERS.HOME;
};

export const useCheckLoginUser = () => {
  const user = useSelector((state: RootState) => state.user);
  if (user.login) return true;

  const userInStorageStr = window.localStorage.getItem(KEY_AUTH_INFORMATION);
  if (userInStorageStr === null) {
    return false;
  }

  const userInStorage = JSON.parse(userInStorageStr);
  if (userInStorage?.login) loginUser(userInStorage.login);
  if (userInStorage?.profile) setUserProfile(userInStorage.profile);
  return true;
};

export const routers = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: PUBLIC_ROUTERS.LOGIN,
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <Navigate to={navigateToPublicRoute()} />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/',
            children: [
              {
                path: PRIVATE_ROUTERS.HOME,
                element: <OverviewPage />,
              },
            ],
          },
        ],
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);

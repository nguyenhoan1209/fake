import ModalPortal from 'components/Modal/ModalPortal';
import type { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { navigateToPrivateRoute, useCheckLoginUser } from 'routes';

const AuthLayout: FC = () => {
  return !useCheckLoginUser() ? (
    <>
      <ModalPortal />
      <Outlet />
    </>
  ) : (
    <Navigate to={navigateToPrivateRoute()} />
  );
};

export default AuthLayout;

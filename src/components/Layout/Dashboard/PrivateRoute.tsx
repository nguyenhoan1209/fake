import ModalPortal from 'components/Modal/ModalPortal';
import { PRIVATE_ROUTERS } from 'config/constants';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { navigateToPublicRoute, useCheckLoginUser } from 'routes';
import { RootState } from 'types/store';

export const PrivateRoute = () => {
  return useCheckLoginUser() ? (
    <>
      <ModalPortal />
      <Outlet />
    </>
  ) : (
    <Navigate to={navigateToPublicRoute()} />
  );
};

export const PrivateRouteRedirect = () => {
  const user = useSelector((state: RootState) => state.user);

  // You may want to check for role/type in user.login if needed
  if (user.login) {
    // Example: if (user.login.role === 'admin') ...
    return <Navigate to={PRIVATE_ROUTERS.HOME} />;
  }

  return <Navigate to={navigateToPublicRoute()} />;
};

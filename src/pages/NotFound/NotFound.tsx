import type { FC } from 'react';

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NotFound: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect((): void => {
    /**
     * https://github.com/remix-run/react-router/discussions/9788
     */
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default NotFound;

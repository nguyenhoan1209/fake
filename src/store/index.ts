import { configureStore } from '@reduxjs/toolkit';

import logger from './logger';
import modalReducer from './slices/modalSlice.ts';
import userReducer from './slices/userSlice.ts';

export default configureStore({
  devTools: import.meta.env.DEV,
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      thunk: {
        extraArgument: () => {},
      },
      serializableCheck: false,
    });

    if (import.meta.env.DEV) {
      return defaultMiddleware.concat(logger);
    }

    return defaultMiddleware;
  },
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers({
      autoBatch: false,
    }),
});

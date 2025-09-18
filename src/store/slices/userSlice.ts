import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KEY_AUTH_INFORMATION } from 'config/constants';
import store from 'store';
import { AdminLoginRes } from 'types/SwaggerTypeAdmin';
import { UserLoginRes } from 'types/SwaggerTypeUser';


type UserState = {
  login?: AdminLoginRes | UserLoginRes;
  profile?: any; // Add profile for users/me response
};

const initialState: UserState = {
  login: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (_, action: PayloadAction<AdminLoginRes | UserLoginRes | undefined>) => {
      return {
        login: action.payload,
      };
    },
    setProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
    logout: () => {
      return {
        login: undefined,
        profile: undefined,
      };
    },
  },
});


// Action creators are generated for each case reducer function
const { login, logout, setProfile } = userSlice.actions;


const loginUser = (state: any) => {
  store.dispatch(login(state));
  window.localStorage.setItem(KEY_AUTH_INFORMATION, JSON.stringify(store.getState().user));
};

const setUserProfile = (profile: any) => {
  store.dispatch(setProfile(profile));
    window.localStorage.setItem(KEY_AUTH_INFORMATION, JSON.stringify(store.getState().user));
};

const logoutUser = () => {
  window.localStorage.removeItem(KEY_AUTH_INFORMATION);
  store.dispatch(logout());
};

export { loginUser, logoutUser, setUserProfile };
const userReducer = userSlice.reducer;
export default userReducer;

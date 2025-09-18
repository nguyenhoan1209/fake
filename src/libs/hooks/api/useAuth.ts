/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifySuccess, notifyError } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { t } from 'i18next';
import { loginUser, setUserProfile } from 'store/slices/userSlice';

const url = {
  login: 'api/v1/fetch_api_key',
  me: 'api/v1/users/me',
  update: 'api/v1/settings',
};

// Fetch user profile
const fetchUserProfile = async (): Promise<any> => {
  const userProfile = await fetcher(
    {
      method: HTTPMethod.GET,
      url: url.me,
    },
    { withToken: true },
  );
  setUserProfile(userProfile); // Save profile in Redux or store
  return userProfile;
};

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: any): Promise<any> =>
      fetcher(
        {
          method: HTTPMethod.POST,
          url: url.login,
          data: body,
        },
        { isFormData: true, withToken: false },
      ),
    onSuccess: async (loginResponse) => {
      loginUser(loginResponse);
      await queryClient.fetchQuery({
        queryKey: ['userProfile'],
        queryFn: fetchUserProfile,
      });
      notifySuccess(
        t('notification.field_successfully', { field: t('auth.login') }),
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (error: any) => {
      notifyError("dmm");
    },
  });
};
const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (body: any): Promise<any> =>
      fetcher(
        {
          method: HTTPMethod.PATCH,
          url: url.update,
          data: body,
        },
        { isFormData: true, withToken: true },
      ),
    onSuccess: async () => {
      await queryClient.fetchQuery({
        queryKey: ['userProfile'],
        queryFn: fetchUserProfile,
      });
      notifySuccess(
        t('notification.field_successfully', { field: t('profile.update') }),
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (error: any) => {
      notifyError(t('notification.field_failed', { field: t('profile.update') }));
    },

  })
}
export { useLogin , useUpdateProfile};
 
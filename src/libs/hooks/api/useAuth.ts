/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess, notifyError } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { t } from 'i18next';
import { loginUser, setUserProfile, setUserRegisterData } from 'store/slices/userSlice';

const url = {
  login: 'api/v1/fetch_api_key',
  me: 'api/v1/users/me',
  update: 'api/v1/settings',
  register: 'api/v1/register',
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

// Fetch register data
const fetchRegisterData = async (): Promise<any> => {
  const registerData = await fetcher(
    {
      method: HTTPMethod.POST,
      url: url.register,
    },
    { withToken: true },
  );
  setUserRegisterData(registerData); // Save register data in Redux or store
  return registerData;
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
      // Automatically fetch register data after successful login
      await queryClient.fetchQuery({
        queryKey: ['registerData'],
        queryFn: fetchRegisterData,
      });
      notifySuccess(
        t('notification.field_successfully', { field: t('auth.login') }),
      );
    },
    onError: (_error: any) => {
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
    onError: (_error: any) => {
      notifyError(t('notification.field_failed', { field: t('profile.update') }));
    },

  })
}

// Hook to automatically fetch registration data on page load/reload
const useFetchRegisterData = () => {
  return useQuery({
    queryKey: ['registerData'],
    queryFn: async () => {
      try {
        const registerData = await fetchRegisterData();
        console.log('✅ Registration data fetched successfully:', registerData);
        return registerData;
      } catch (error) {
        console.error('❌ Failed to fetch registration data:', error);
        throw error;
      }
    },
    // Enable automatic refetch on window focus (when user comes back to tab)
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export { useLogin, useUpdateProfile, useFetchRegisterData };

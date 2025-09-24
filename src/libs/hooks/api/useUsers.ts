import { useQuery } from "@tanstack/react-query";
import { fetcher, HTTPMethod } from "config/api";

const url = {
  users: "api/v1/users",
};

// User interface
interface ZulipUser {
  user_id: number;
  full_name: string;
  email: string;
  delivery_email?: string | null;
  avatar_url: string;
  is_active: boolean;
  is_admin: boolean;
  is_owner: boolean;
  is_guest: boolean;
  is_bot: boolean;
  bot_type?: number | null;
  bot_owner_id?: number;
  role: number;
  timezone: string;
  date_joined: string;
  profile_data?: Record<string, {
    value: string;
    rendered_value?: string;
  }>;
}

// API Response interface
interface ZulipUsersResponse {
  result: 'success' | 'error';
  members: ZulipUser[];
  msg?: string;
}

// Mock data để test khi API không hoạt động


const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<ZulipUser[]> => {
      try {
        const response: ZulipUsersResponse = await fetcher({
          method: HTTPMethod.GET,
          url: url.users,
          params: {
            client_gravatar: false,
            include_custom_profile_fields: false,
          },
        });
        return response.members;
      } catch (error) {
        console.error('Error fetching users:', error);
        console.warn('API call failed, using mock data as fallback');
        
        // Fallback to mock data when API fails
        return [].sort((a: ZulipUser, b: ZulipUser) => {
          if (a.is_active !== b.is_active) {
            return a.is_active ? -1 : 1;
          }
          if (a.role !== b.role) {
            return a.role - b.role;
          }
          return a.full_name.localeCompare(b.full_name);
        });
      }
    },

  });
};

export { useFetchUsers, type ZulipUser };

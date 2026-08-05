import api from '@/lib/api';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/types/auth';
import { setToken, setUser, removeToken, removeUser } from '@/lib/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<any, AuthResponse>('/auth/login', credentials);
    if (response.success && response.data.token) {
      setToken(response.data.token);
      setUser(response.data.user);
    }
    return response;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<any, AuthResponse>('/auth/register', credentials);
    if (response.success && response.data.token) {
      setToken(response.data.token);
      setUser(response.data.user);
    }
    return response;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeToken();
      removeUser();
    }
  },

  getMe: async (): Promise<{ success: boolean; data: User }> => {
    return api.get('/auth/me');
  }
};

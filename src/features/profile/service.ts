import BASE_URL from '../../config/Env';
import {Endpoints} from '../../api/endpoints';

export const profileService = {
  async getProfile(token: string) {
    try {
      const response = await fetch(
        `${BASE_URL}${Endpoints.Profile}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get Profile Error:', error);
      throw error;
    }
  },
};
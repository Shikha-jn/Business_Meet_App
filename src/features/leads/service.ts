import api from '../../api/axios';
import {LeadsResponse} from './types';

export const getMyLeads = async (
  page = 1,
  limit = 10,
): Promise<LeadsResponse> => {
  const response = await api.get(
    `/leads/my-leads?page=${page}&limit=${limit}`,
  );

  return response.data.data;
};
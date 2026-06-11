import api from '../../api/axios';
import {LeadsResponse} from './types';
import {Endpoints} from '../../api/endpoints';

export const getMyLeads = async (
  page = 1,
  limit = 10,
): Promise<LeadsResponse> => {
  const response = await api.get(
    `${Endpoints.GetMyLeads}?page=${page}&limit=${limit}`,
  );

  return response.data.data;
};
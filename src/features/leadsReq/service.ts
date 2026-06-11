import api from '../../api/axios';
import { Endpoints } from '../../api/endpoints';
import { LeadRequirementsResponse } from './types';

export const getLeadRequirements = async (
  page = 1,
  limit = 10,
): Promise<LeadRequirementsResponse> => {
  const response = await api.get(
    Endpoints.GetLeadReq,
    {
      params: {
        page,
        limit,
      },
    },
  );

  return response.data.data;
};
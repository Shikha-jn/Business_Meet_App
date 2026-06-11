import api from '../../api/axios';
import { CompanyProfile } from './types';
import {Endpoints} from '../../api/endpoints';

export const getCompanyProfile =
  async (): Promise<CompanyProfile> => {
    const response = await api.get(Endpoints.Profile);

    return response.data.data;
  };
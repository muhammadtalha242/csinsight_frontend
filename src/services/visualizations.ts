import { API_BASE_URL } from '@/constants/const';
import { getUrlSearchParams } from '@/util/getSearchParams';
import axios from 'axios';

import { type Filter } from '@/types/filters';

export interface getPapersCountsPostResponse {
  count: number;
  totalCitations: number;
  year: string;
}

const getPapersCount = async ({ queryKey }: any) => {
  const [, filters] = queryKey;

  console.log('queryKey', queryKey);
  const queryParams = getUrlSearchParams(filters);

  const res = await axios.get(`${API_BASE_URL}/papers/years?${queryParams}`);

  return res.data;
};

const getPapersCountPost = async (queryParams: Filter): Promise<getPapersCountsPostResponse[]> => {
  console.log('queryParams', queryParams);
  const res = await axios.post<getPapersCountsPostResponse[]>(`${API_BASE_URL}/papers/years`, queryParams);

  return res.data;
};

export default {
  getPapersCount,
  getPapersCountPost,
};

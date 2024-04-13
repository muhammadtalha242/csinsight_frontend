import { API_BASE_URL } from '@/constants/const';
import axios from 'axios';

import { type Filter, type PagedParameters } from '@/types/filters';
import type { AuthorData } from '@/components/dashboard/author/AuthorsTable';
import type { Data } from '@/components/dashboard/paper/TopPapers';
import type { VenueData } from '@/components/dashboard/venue/VenuesTable';

export interface getPapersCountsPostResponse {
  count: number;
  totalCitations: number;
  year: string;
}

export interface getTopPapersResponse {
  rowCount: number;
  rows: Data[];
}

export interface getAuthorsResponse {
  rowCount: number;
  rows: AuthorData[];
}

export interface getVenuesResponse {
  rowCount: number;
  rows: VenueData[];
}

export interface getS2FeildResponse {
  category: string;
  category_count: number;
}

const getPapersCountPost = async (queryParams: Filter): Promise<getPapersCountsPostResponse[]> => {
  const res = await axios.post<getPapersCountsPostResponse[]>(`${API_BASE_URL}/papers/years`, queryParams);

  return res.data;
};

const getTopPapers = async (queryParams: Filter & PagedParameters): Promise<getTopPapersResponse> => {
  const res = await axios.post<getTopPapersResponse>(`${API_BASE_URL}/papers/info`, queryParams);

  return res.data;
};

const getS2Feilds = async (queryParams: Filter): Promise<getS2FeildResponse[]> => {
  const res = await axios.post<getS2FeildResponse[]>(`${API_BASE_URL}/papers/s2f`, queryParams);

  return res.data;
};

const getAuthors = async (queryParams: Filter & PagedParameters): Promise<getAuthorsResponse> => {
  const res = await axios.post<getAuthorsResponse>(`${API_BASE_URL}/authors/info`, queryParams);

  return res.data;
};

const getVenues = async (queryParams: Filter & PagedParameters): Promise<getVenuesResponse> => {
  const res = await axios.post<getVenuesResponse>(`${API_BASE_URL}/venues/info`, queryParams);

  return res.data;
};

export default {
  getTopPapers,
  getPapersCountPost,
  getS2Feilds,
  getAuthors,
  getVenues,
};

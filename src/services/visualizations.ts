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

export interface CoauthorshipMatrixData {
  series: {
    venue: string;
    data: number[];
  }[];
  categories: string[];
}

export interface SankeyNode {
  id: string;
  title: string;
}

export interface SankeyEdge {
  source: string;
  target: string;
  value: number;
  type?: string;
}

interface SankeyOptions {
  order: string[][][];
  width?: number;
  height?: number;
  canvasStyle?: string;
  spacing?: number;
  nodeWidth?: number;
}

export interface SankeyData {
  nodes: SankeyNode[];
  edges: SankeyEdge[];
  options: SankeyOptions;
}

export interface Author {
  id: string;
  venue: string;
  papercount: number;
  citationcount: number;
  hindex: number;
  research_area: string;
  institution_venue: string;
}

export interface HIndexDistributionData {
  categories: string[];
  counts: number[];
}

export interface ResearchAreasDistributionData {
  labels: string[];
  counts: number[];
}

export interface PublicationsCitationsData {
  x: number;
  y: number;
  name: string;
}

export interface IVenue {
  venue: string;
  publicationCount: number;
}

export interface VenueImpact {
  venue: string;
  averageCitations: number;
}

export interface FieldOfStudyDistribution {
  venue: string;
  fieldOfStudy: string;
  count: number;
}

/// Papers ///
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

/// AUTHORS ///

const getAuthors = async (queryParams: Filter & PagedParameters): Promise<getAuthorsResponse> => {
  const res = await axios.post<getAuthorsResponse>(`${API_BASE_URL}/authors/info`, queryParams);

  return res.data;
};

// Dummy data fetch functions
export const fetchCoauthorshipMatrix = async (): Promise<CoauthorshipMatrixData> => {
  // Replace with actual API call using fetch or axios
  // For now, return dummy data
  return {
    categories: ['Author A', 'Author B', 'Author C', 'Author D'],
    series: [
      { venue: 'Author A', data: [0, 2, 5, 1] },
      { venue: 'Author B', data: [2, 0, 3, 4] },
      { venue: 'Author C', data: [5, 3, 0, 2] },
      { venue: 'Author D', data: [1, 4, 2, 0] },
    ],
  };
};

export const fetchAuthors = async (): Promise<Author[]> => {
  return [
    {
      id: '1',
      venue: 'Author A',
      papercount: 50,
      citationcount: 1000,
      hindex: 25,
      research_area: 'Biology',
      institution_venue: 'University X',
    },
    {
      id: '2',
      venue: 'Author B',
      papercount: 40,
      citationcount: 800,
      hindex: 20,
      research_area: 'Chemistry',
      institution_venue: 'University Y',
    },
    // Add more dummy authors
  ];
};

export const fetchHIndexDistribution = async (): Promise<HIndexDistributionData> => {
  const data = {
    categories: ['0-5', '6-10', '11-15', '16-20', '21+'],
    counts: [1000, 850, 500, 200, 50],
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 10); // Simulate network latency
  });
};

export const fetchResearchAreasDistribution = async (): Promise<ResearchAreasDistributionData> => {
  return {
    labels: ['Biology', 'Chemistry', 'Physics', 'Mathematics', 'Other'],
    counts: [2000, 1500, 1000, 800, 500],
  };
};

export const fetchPublicationsCitationsData = async (queryParams: Filter): Promise<PublicationsCitationsData[]> => {
  // const res = await axios.post<PublicationsCitationsData[]>(
  //   `${API_BASE_URL}/authors/publications-citations-correlation`,
  //   queryParams
  // );
  // return res.data;
  const data = [
    {
      x: 36651,
      y: 142,
      name: 'B. Noble',
    },
    {
      x: 17375,
      y: 104,
      name: 'S. Sukhoruchkin',
    },
    {
      x: 17315,
      y: 117,
      name: 'Z. Soroko',
    },
    {
      x: 15635,
      y: 12504,
      name: 'anonymous',
    },
    {
      x: 11707,
      y: 710,
      name: 'M. Kumar',
    },
    {
      x: 11660,
      y: 142974,
      name: 'Wen Wang',
    },
    {
      x: 10251,
      y: 3842,
      name: 'Nasa',
    },
    {
      x: 9350,
      y: 479,
      name: '     ',
    },
    {
      x: 9255,
      y: 677,
      name: 'C. Wohlfarth',
    },
    {
      x: 8791,
      y: 89546,
      name: 'Y. Liu',
    },
  ];
  return data;
};

export const fetchSankeyData = async (): Promise<SankeyData> => {
  // const response = await axios.get<SankeyData>('/api/sankey-data');
  return {
    nodes: [
      {
        id: 'a',
        title: 'AAA',
      },
      {
        id: 'b',
        title: 'BBB',
      },
      {
        id: 'c',
        title: 'CCC',
      },
    ],
    edges: [
      {
        source: 'a',
        target: 'c',
        value: 1,
        type: 'A',
      },
      {
        source: 'b',
        target: 'c',
        value: 2,
        type: 'A',
      },
    ],
    options: {
      order: [[['a', 'b']], [['c']]],
    },
  };
};

/// Venues ///
const getVenues = async (queryParams: Filter & PagedParameters): Promise<getVenuesResponse> => {
  const res = await axios.post<getVenuesResponse>(`${API_BASE_URL}/venues/info`, queryParams);

  return res.data;
};

export const fetchTopVenues = async (queryParams: Filter): Promise<IVenue[]> => {
  // const res = await axios.post<IVenue[]>(`${API_BASE_URL}/venues/topVenues`, queryParams);
  const data = [
    {
      venue: 'Nature',
      publicationCount: 69274,
    },
    {
      venue: 'PLoS ONE',
      publicationCount: 61573,
    },
    {
      venue: 'Scientific Reports',
      publicationCount: 54216,
    },
    {
      venue: 'Social Science Research Network',
      publicationCount: 52510,
    },
    {
      venue: 'arXiv.org',
      publicationCount: 52172,
    },
    {
      venue: 'Science',
      publicationCount: 47284,
    },
    {
      venue: 'British medical journal',
      publicationCount: 43649,
    },
    {
      venue: 'Journal of Biological Chemistry',
      publicationCount: 42065,
    },
    {
      venue: 'bioRxiv',
      publicationCount: 39688,
    },
    {
      venue: 'The Lancet',
      publicationCount: 39177,
    },
  ];
  return data;
};

export const fetchVenueImpact = async (queryParams: Filter): Promise<VenueImpact[]> => {
  // const res = await axios.post<VenueImpact[]>(`${API_BASE_URL}/venues/venueImpact`, queryParams);
  const data = [
    {
      venue: 'Operational Research Quarterly (1970-1977)',
      averageCitations: 4048,
    },
    {
      venue: 'The State of World Fisheries and Aquaculture',
      averageCitations: 3306,
    },
    {
      venue: 'Applied Optimization',
      averageCitations: 2795.5,
    },
    {
      venue: 'Use R!',
      averageCitations: 2407.769230769231,
    },
    {
      venue: 'Monographs in population biology',
      averageCitations: 2383.25,
    },
    {
      venue: 'STUDI ORGANIZZATIVI',
      averageCitations: 2209.6315789473683,
    },
    {
      venue: 'The International Series on Asian Studies in Computer and Information Science',
      averageCitations: 2069,
    },
    {
      venue: 'European Conference on Computational Learning Theory',
      averageCitations: 1956.6,
    },
    {
      venue: 'Studies in Logic and the Foundations of Mathematics',
      averageCitations: 1954.5,
    },
    {
      venue: 'Advances in Clinical Child Psychology',
      averageCitations: 1842,
    },
  ];
  return data;
};

export const fetchFieldsOfStudyDistribution = async (queryParams: Filter): Promise<FieldOfStudyDistribution[]> => {
  // const res = await axios.post<FieldOfStudyDistribution[]>(
  //   `${API_BASE_URL}/venues/fieldsOfStudyDistribution`,
  //   queryParams
  // );
  const data = [
    {
      publicationvenueid: '0aed7a40-85f3-4c66-9e1b-c1556c57001b',
      venue: 'PLoS ONE',
      fieldofstudy: {
        source: 'external',
        category: 'Medicine',
      },
      publicationcount: '60660',
    },
    {
      publicationvenueid: '1901e811-ee72-4b20-8f7e-de08cd395a10',
      venue: 'arXiv.org',
      fieldofstudy: {
        source: 'external',
        category: 'Computer Science',
      },
      publicationcount: '51737',
    },
    {
      publicationvenueid: '1901e811-ee72-4b20-8f7e-de08cd395a10',
      venue: 'arXiv.org',
      fieldofstudy: {
        source: 's2-fos-model',
        category: 'Computer Science',
      },
      publicationcount: '41572',
    },
    {
      publicationvenueid: 'f99f77b7-b1b6-44d3-984a-f288e9884b9b',
      venue: 'Scientific Reports',
      fieldofstudy: {
        source: 'external',
        category: 'Medicine',
      },
      publicationcount: '40459',
    },
    {
      publicationvenueid: '099a2ecc-54f9-42d3-9ea0-0189027aa04f',
      venue: 'Journal of Biological Chemistry',
      fieldofstudy: {
        source: 'external',
        category: 'Medicine',
      },
      publicationcount: '40151',
    },
    {
      publicationvenueid: '027ffd21-ebb0-4af8-baf5-911124292fd0',
      venue: 'bioRxiv',
      fieldofstudy: {
        source: 'external',
        category: 'Biology',
      },
      publicationcount: '39257',
    },
    {
      publicationvenueid: '099a2ecc-54f9-42d3-9ea0-0189027aa04f',
      venue: 'Journal of Biological Chemistry',
      fieldofstudy: {
        source: 's2-fos-model',
        category: 'Biology',
      },
      publicationcount: '39195',
    },
    {
      publicationvenueid: '3048b449-a773-4256-9bb5-5e61fbb61e52',
      venue: 'British medical journal',
      fieldofstudy: {
        source: 'external',
        category: 'Medicine',
      },
      publicationcount: '36300',
    },
    {
      publicationvenueid: 'bb95bf2e-8383-4748-bf9d-d6906d091085',
      venue: 'Proceedings of the National Academy of Sciences of the United States of America',
      fieldofstudy: {
        source: 'external',
        category: 'Medicine',
      },
      publicationcount: '32331',
    },
    {
      publicationvenueid: '027ffd21-ebb0-4af8-baf5-911124292fd0',
      venue: 'bioRxiv',
      fieldofstudy: {
        source: 's2-fos-model',
        category: 'Biology',
      },
      publicationcount: '31650',
    },
  ];
  function convertAndAggregateData(data: any[], normalize: boolean): FieldOfStudyDistribution[] {
    const aggregationMap = new Map<string, FieldOfStudyDistribution>();

    data.forEach((item) => {
      let venue = item.venue;
      let fieldOfStudy = item.fieldofstudy.category;
      let count = parseInt(item.publicationcount, 10);

      if (normalize) {
        venue = venue.trim();
        fieldOfStudy = fieldOfStudy.trim();
      }

      const key = `${venue}||${fieldOfStudy}`;

      if (aggregationMap.has(key)) {
        const existing = aggregationMap.get(key)!;
        existing.count += count;
      } else {
        aggregationMap.set(key, {
          venue,
          fieldOfStudy,
          count,
        });
      }
    });

    return Array.from(aggregationMap.values());
  }

  // Usage with normalization
  const convertedDataNormalized: FieldOfStudyDistribution[] = convertAndAggregateData(data, true);
  return convertedDataNormalized;
};

export default {
  getTopPapers,
  getPapersCountPost,
  getS2Feilds,
  getAuthors,
  getVenues,
};

export interface AuthorFilter {
  _id: string;
  fullname: string;
}

export interface VenueFilter {
  _id: string;
  names: string;
}

export interface Filter {
  yearStart: string;
  yearEnd: string;
  citationsMin: string;
  citationsMax: string;
  authorIds: AuthorFilter[];
  venueIds: VenueFilter[];
  accessType: string | null;
  typesOfPaper: string[];
  fieldsOfStudy: string[];
  publishers: string[];
  metric: string;
}

export interface PagedParameters {
  page: string;
  pageSize: string;
  sortField: string;
  sortDirection: string;
}

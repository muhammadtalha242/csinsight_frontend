'use client';

import React, { useContext, useState } from 'react';
import visualizationsService, { type getTopPapersResponse } from '@/services/visualizations';
import { Card, CardHeader, CircularProgress, Divider, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import type { SxProps } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { useQuery } from 'react-query';

import { FilterContext } from '@/contexts/filters.context';

export interface Data {
  id: number;
  year: number;
  authors: { name: string; id: number }[];
  venue: string;
  title: string;
  citation: number;
  link: string;
}

const nonSortingKeys = ['authors', 'venue', 'title', 'link'];

type Order = 'asc' | 'desc';
type SortingKeys = 'id' | 'year' | 'citation';

interface HeadCell {
  id: keyof Data;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    label: 'Title',
  },
  {
    id: 'year',
    label: 'Year',
  },
  {
    id: 'venue',
    label: 'Venue',
  },
  {
    id: 'authors',
    label: 'Author',
  },
  {
    id: 'citation',
    label: 'Citations',
  },
  {
    id: 'link',
    label: 'Link',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: SortingKeys) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: SortingKeys) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {nonSortingKeys.includes(headCell.id) ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id as SortingKeys)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable({ sx }: { sx?: SxProps }) {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<SortingKeys>('citation');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const { state: filterState } = useContext(FilterContext);
  const { data, isLoading } = useQuery<getTopPapersResponse, Error>(
    ['topPapers', filterState.filters, page, rowsPerPage, orderBy, order],
    () =>
      visualizationsService.getTopPapers({
        ...filterState.filters,
        page: page.toString(),
        pageSize: rowsPerPage.toString(),
        sortField: orderBy,
        sortDirection: order,
      })
  );

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: SortingKeys) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card sx={{ ...sx, width: '100%', overflow: 'hidden' }}>
      <CardHeader title="Top Papers" />
      <Divider />
      <Box>
        {data && data?.rows.length > 0 ? (
          <>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader size="small">
                <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                <TableBody>
                  {data.rows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                        <TableCell id={labelId}>{row.title}</TableCell>
                        <TableCell align="center">{row.year}</TableCell>
                        <TableCell align="center">{row.venue}</TableCell>
                        <TableCell align="center">{row.authors.map((a) => a.name).join(', ')}</TableCell>
                        <TableCell align="center">{row.citation}</TableCell>
                        <TableCell align="center">
                          <Link href={row.link}>Link</Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[100, 200, 250]}
              component="div"
              count={data?.rowCount || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 440 }}>
            {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
          </Box>
        )}
      </Box>
    </Card>
  );
}

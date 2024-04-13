'use client';

import * as React from 'react';
import visualizationsService, { type getAuthorsResponse } from '@/services/visualizations';
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

export interface AuthorData {
  id: number;
  name: string;
  papercount: number;
  hindex: number;
  totalCitations: number;
  link: string;
}


type Order = 'asc' | 'desc';
const nonSortingKeys = ['name', 'link'];
type SortingKeys = 'id' | 'hIndex' | 'papers' | 'totalCitations';

interface HeadCell {
  id: keyof AuthorData;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'papercount',
    label: 'Papers Count',
  },
  {
    id: 'hindex',
    label: 'H-Index',
  },
  {
    id: 'totalCitations',
    label: 'Total Citations',
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

export default function AuthorsTable({ sx }: { sx?: SxProps }) {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<SortingKeys>('totalCitations');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const { state: filterState } = React.useContext(FilterContext);
  const { data, isLoading } = useQuery<getAuthorsResponse, Error>(
    ['getAuthors', filterState.filters, page, rowsPerPage, orderBy, order],
    () =>
      visualizationsService.getAuthors({
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
      <CardHeader name="Top Papers" />
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
                        <TableCell id={labelId}>{row.name}</TableCell>
                        <TableCell align="center">{row.papercount}</TableCell>
                        <TableCell align="center">{row.hindex}</TableCell>
                        <TableCell align="center">{row.totalCitations}</TableCell>
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

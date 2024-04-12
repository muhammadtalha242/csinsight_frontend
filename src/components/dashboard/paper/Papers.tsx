import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
// import dayjs from 'dayjs';

import { PapersCount } from '@/components/dashboard/overview/papersCount';
import DistributionsOverTime from '@/components/dashboard/overview/distributionsOverTime';
// import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
// import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import S2FeidlOfStudy from '@/components/dashboard/overview/s2feildOfStudy';
// import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import CustomPaginationActionsTable from './TopPapers';
// import { Table } from '@mui/material';

export default function Papers(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid lg={4} sm={6} xs={12}>
        <PapersCount diff={12} trend="up" sx={{ height: '100%' }} value="45M" />
      </Grid>
      <Grid lg={4} sm={6} xs={12}>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value="82M" />
      </Grid>
      {/* <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={75.5} />
      </Grid> */}
      <Grid lg={4} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="19.2k" />
      </Grid>
      <Grid lg={8} xs={12}>
        <DistributionsOverTime />
      </Grid>
      <Grid lg={4} md={12} xs={12}>
        <S2FeidlOfStudy />
      </Grid>
     
      <Grid lg={12} md={12} xs={12}>
      <CustomPaginationActionsTable sx={{ height: '100%' }}/>
      </Grid>
    </Grid>
  );
}

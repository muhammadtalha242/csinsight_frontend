import Grid from '@mui/material/Unstable_Grid2';

import DistributionsOverTime from '@/components/dashboard/overview/distributionsOverTime';
import { PapersCount } from '@/components/dashboard/overview/papersCount';
import S2FeidlOfStudy from '@/components/dashboard/overview/s2feildOfStudy';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';

import PublicationAreaChartWithSampleData from '../overview/PublicationAreaChart';
import CustomPaginationActionsTable from './TopPapers';

export default function Papers() {
  return (
    <Grid container spacing={3}>
      <Grid lg={4} sm={6} xs={12}>
        <PapersCount diff={12} trend="up" sx={{ height: '100%' }} value="45M" />
      </Grid>
      <Grid lg={4} sm={6} xs={12}>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value="82M" />
      </Grid>
      <Grid lg={4} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="19.2k" />
      </Grid>
      <Grid lg={8} xs={12}>
        <DistributionsOverTime />
      </Grid>
      <Grid lg={4} md={12} xs={12}>
        <S2FeidlOfStudy />
      </Grid>
      <Grid lg={12} md={10} xs={12}>
        <PublicationAreaChartWithSampleData />
      </Grid>
      <Grid lg={12} md={12} xs={12}>
        <CustomPaginationActionsTable sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}

import Grid from '@mui/material/Unstable_Grid2';

import DistributionsOverTime from '@/components/dashboard/overview/distributionsOverTime';
import S2FeidlOfStudy from '@/components/dashboard/overview/s2feildOfStudy';

import PublicationAreaChartWithSampleData from '../overview/PublicationAreaChart';
import CustomPaginationActionsTable from './TopPapers';

export default function Papers() {
  return (
    <Grid container spacing={3}>
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

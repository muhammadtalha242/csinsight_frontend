import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PublicationAreaChartWithSampleData from '../overview/PublicationAreaChart';
// import FieldsOfStudyChart from './FieldsOfStudyChart';
import TopVenuesChart from './TopVenuesChart';
// import VenueImpactChart from './VenueImpactChart';
import VenueTable from './VenuesTable';

export default function Venues() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Venues</Typography>
      <Grid lg={4} sm={6} xs={12}>
        <TopVenuesChart />
      </Grid>
      <Grid lg={6} md={6} xs={6}>
        {/* <VenueImpactChart /> */}
      </Grid>
      <Grid lg={12} md={10} xs={12}>
        {/* <FieldsOfStudyChart /> */}
      </Grid>
      <Grid lg={12} md={10} xs={12}>
        <PublicationAreaChartWithSampleData />
      </Grid>
      <VenueTable />
    </Stack>
  );
}

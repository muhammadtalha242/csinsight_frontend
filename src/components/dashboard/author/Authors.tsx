import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AuthorsTable from '@/components/dashboard/author/AuthorsTable';

// import CoauthorshipMatrix from './CoauthorshipMatrix';
import HIndexDistribution from './HIndexDistribution';
import PublicationsCitationsCorrelation from './PublicationsCitationsCorrelation';
import ResearchAreasDistribution from './ResearchAreasDistribution';

export default function Authors() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Authors</Typography>
      <Grid item xs={12} md={6}>
        <HIndexDistribution />
      </Grid>
      <Grid lg={8} xs={12}>
        <PublicationsCitationsCorrelation />
      </Grid>
      <Grid lg={4} md={12} xs={12}>
        <ResearchAreasDistribution />
      </Grid>
      <AuthorsTable />
    </Stack>
  );
}

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import VenueTable from './VenuesTable';

export default function Venues() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Venues</Typography>
      <VenueTable />
    </Stack>
  );
}

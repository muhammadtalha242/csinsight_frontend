import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import VenueTable from './VenuesTable';

export default function Venues(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      {/* <Stack direction="row" spacing={3}> */}
      {/* <Stack spacing={1} sx={{ flex: '1 1 auto' }}> */}
      <Typography variant="h4">Venues</Typography>
      <VenueTable />
      {/* <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack> */}
      {/* <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <CompaniesFilters />
      <Grid container spacing={3}>
        {integrations.map((integration) => (
          <Grid key={integration.id} lg={4} md={6} xs={12}>
            <IntegrationCard integration={integration} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={3} size="small" />
      </Box> */}
    </Stack>
  );
}

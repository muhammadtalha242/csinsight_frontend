import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


import AuthorsTable  from '@/components/dashboard/author/AuthorsTable';

export default function Authors(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      {/* <Stack direction="row" spacing={3}> */}
      {/* <Stack spacing={1} sx={{ flex: '1 1 auto' }}> */}
      <Typography variant="h4">Authors</Typography>
      {/* <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
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
      </Stack> */}
      {/* <CustomersFilters /> */}
      <AuthorsTable />
    </Stack>
  );
}

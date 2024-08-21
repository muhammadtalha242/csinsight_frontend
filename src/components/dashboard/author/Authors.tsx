import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


import AuthorsTable  from '@/components/dashboard/author/AuthorsTable';

export default function Authors() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Authors</Typography>
      <AuthorsTable />
    </Stack>
  );
}

import { HelpOutline } from '@mui/icons-material';
import { Stack, Tooltip } from '@mui/material';

export default function FilterLabel(props: { label: string; helpTooltip: string }) {
  return (
    <Stack
      direction="row"
      sx={{
        paddingBottom: 1,
        alingItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>{props.label}</div>
      <Tooltip title={props.helpTooltip}>
        <HelpOutline />
      </Tooltip>
    </Stack>
  );
}

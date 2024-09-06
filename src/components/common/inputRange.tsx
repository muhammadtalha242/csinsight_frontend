import { Stack, TextField } from '@mui/material';

import FilterLabel from './filterLabel';

export interface FilterTextFieldProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
}
export interface FilterRangeProps {
  label: string;
  labelStart: string;
  labelEnd: string;
  helpTooltip: string;
  valueStart: string;
  valueEnd: string;
  setValueStart: (valueStart: string) => void;
  setValueEnd: (valueEnd: string) => void;
}
function FilterTextField({ label, value, setValue }: FilterTextFieldProps) {
  return (
    <TextField
      label={label}
      value={value}
      type="number"
      onChange={(event) => setValue(event.target.value)}
      InputProps={{
        inputProps: {
          min: 0,
        },
      }}
      sx={{ width: '135px' }}
    />
  );
}

export default function FilterRange(props: FilterRangeProps) {
  return (
    <>
      <FilterLabel label={props.label} helpTooltip={props.helpTooltip} />
      <Stack direction="row" style={{ alignItems: 'center' }} justifyContent="space-between">
        <FilterTextField label={props.labelStart} value={props.valueStart} setValue={props.setValueStart} />
        <div>-</div>
        <FilterTextField label={props.labelEnd} value={props.valueEnd} setValue={props.setValueEnd} />
      </Stack>
    </>
  );
}

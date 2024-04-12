import * as React from 'react';
import { DEBOUNCE_DELAY_AUTOCOMPLETE, type AUTOCOMPLETE_ROUTES } from '@/constants/const';
import { useAutocomplete } from '@/services/autocomplete';
import { Autocomplete, CircularProgress, debounce, TextField } from '@mui/material';

interface Option {
  label: string;
  value: string;
}
interface SelectProps {
  route: AUTOCOMPLETE_ROUTES;
  options: Option[];
  multiple?: boolean;
  inputLabel: string;
  onChange?: (selectedOptions: string[] | string | null) => void; // Updated type to match the Autocomplete's expectation
}

const Select: React.FC<SelectProps> = ({ options, multiple, inputLabel, route, onChange }) => {
  const [, setSelectedOption] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState<string>('');
  const { data, isFetching } = useAutocomplete({ route, inputValue });
  const handleChange = debounce(async (_: React.SyntheticEvent, value: Option[] | Option | null) => {
    let selectedValues: string[] | string | null = null;

    if (Array.isArray(value)) {
      selectedValues = value.map((option) => option.label);
    } else if (value) {
      selectedValues = value.label;
    }

    setSelectedOption(Array.isArray(selectedValues) ? selectedValues : selectedValues ? [selectedValues] : []);

    if (onChange) {
      onChange(selectedValues);
    }
  }, DEBOUNCE_DELAY_AUTOCOMPLETE);

  return (
    <Autocomplete
      multiple={multiple}
      id="tags-outlined"
      options={data || options}
      getOptionLabel={(option) => option.value}
      filterSelectedOptions
      loading={false}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue.trim());
      }}
      renderOption={(props, option) => <li {...props}>{option.value}</li>}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={inputLabel}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default Select;

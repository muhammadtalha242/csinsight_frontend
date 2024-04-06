/* eslint-disable react/function-component-definition */
// Disable the eslint rule for function component definition to avoid unnecessary warnings.
import * as React from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

// import { AUTOCOMPLETE_ROUTES } from '../constants/consts';
// import { useAutocomplete } from '../services/autocomplete';

interface SelectProps {
  route?: string;
  options: unknown[];
  multiple?: boolean;
  inputLabel: string;
  onChange?: (selectedOptions: string[] | string | null) => void; // Updated type to match the Autocomplete's expectation
}

const Select: React.FC<SelectProps> = ({ options, multiple, inputLabel, route, onChange }) => {
  const [, setSelectedOption] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  //   const { data, isFetching } = useAutocomplete({ route, inputValue });

  const handleChange = (_: React.SyntheticEvent, value: string[] | string | null) => {
    setInputValue(inputValue);
    let selectedValues: string[] | string | null = null;

    if (Array.isArray(value)) {
      selectedValues = value.map((option) => option);
    } else if (value) {
      selectedValues = value;
    }

    setSelectedOption(Array.isArray(selectedValues) ? selectedValues : selectedValues ? [selectedValues] : []);

    if (onChange) {
      onChange(selectedValues);
    }
  };

  return (
    <Autocomplete
      multiple={multiple}
      id="tags-outlined"
      options={options}
      getOptionLabel={(option) => option as string}
      filterSelectedOptions
      loading={false}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue.trim());
      }}
      renderOption={(props) => <li {...props}>TEST</li>}
      //   onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={inputLabel}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {/* {false ? (
                                    <CircularProgress color="inherit" size={20} />
                                ) : null} */}
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

'use client';

import * as React from 'react';
import { ACCESS_TYPE, FIELDS_OF_STUDY, TYPES_OF_PAPER } from '@/constants/const';
import { CheckCircleTwoTone } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, Drawer, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { styled, useTheme } from '@mui/material/styles';

import { type Filter } from '@/types/filters';
import { ApplicationContext, SetSideNavCollapsed } from '@/contexts/app.context';
import { ClearFilter, FilterContext, intialFilter, SetFilters as setFiltersContext } from '@/contexts/filters.context';
import Select from '@/components/common/select';

import FilterRange from '../common/inputRange';

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  height: 'var(--MainNav-height)',
  justifyContent: 'flex-start',
}));

export function Filters(): React.JSX.Element {
  const {
    state: { isSideNavOpen },
    dispatch: applicatonDispatch,
  } = React.useContext(ApplicationContext);
  const theme = useTheme();
  const { state: filterState, dispatch: filterDispatch } = React.useContext(FilterContext);
  const [filter, setFilter] = React.useState<Filter>(intialFilter);

  const handleSelectChange =
    (
      name:
        | 'authorIds'
        | 'venueIds'
        | 'typesOfPaper'
        | 'fieldsOfStudy'
        | 'publishers'
        | 'metric'
        | 'accessType'
        | 'yearStart'
        | 'yearEnd'
    ) =>
    (selectedOptions: string[] | string | null) => {
      setFilter((prev) => ({ ...prev, [name]: selectedOptions }));
    };

  const rest = () => {
    ClearFilter(filterDispatch)();
    setFilter(intialFilter);
  };

  return (
    <Box>
      <Drawer
        sx={{
          '--SideNav-background': 'var(--mui-palette-neutral-950)',
          '--SideNav-color': 'var(--mui-palette-common-white)',
          '--NavItem-color': 'var(--mui-palette-neutral-300)',
          '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
          '--NavItem-active-background': 'var(--mui-palette-primary-main)',
          '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
          '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
          '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
          '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
          '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
          bgcolor: 'var(--SideNav-background)',
          color: 'var(--SideNav-color)',
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          height: '100%',
          maxWidth: '100%',
          position: 'fixed',
          scrollbarWidth: 'none',
          width: 'var(--SideNav-width)',
          zIndex: 'var(--SideNav-zIndex)',
          '&::-webkit-scrollbar': { display: 'none' },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 'var(--SideNav-width)',
          },
        }}
        variant="persistent"
        anchor="right"
        open={isSideNavOpen}
      >
        <DrawerHeader>
          <IconButton
            onClick={() => {
              SetSideNavCollapsed(applicatonDispatch)({ isSideNavOpen: false });
            }}
          >
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Typography variant="h5" sx={{ textAlign: 'start', width: '100%' }}>
            Filters
          </Typography>
        </DrawerHeader>
        <Divider />
        <Box sx={{ padding: '16px' }}>
          <Box sx={{ marginBottom: '16px' }}>
            <Select
              route="authors"
              options={[]}
              inputLabel="Authors"
              onChange={handleSelectChange('authorIds')}
              multiple
            />
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <Select
              route="venues"
              inputLabel="Venues"
              multiple
              options={[]}
              onChange={handleSelectChange('venueIds')}
            />
          </Box>

          <Box sx={{ marginBottom: '16px' }}>
            <Select
              route="fieldsOfStudy"
              inputLabel="Field of Study"
              multiple
              onChange={handleSelectChange('fieldsOfStudy')}
              options={FIELDS_OF_STUDY.map((field) => ({ label: field, value: field }))}
            />
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <Select
              route="typesOfPaper"
              inputLabel="Types of papers"
              multiple
              onChange={handleSelectChange('typesOfPaper')}
              options={TYPES_OF_PAPER.map((type) => ({ label: type, value: type }))}
            />
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <Select
              route="accessTypes"
              inputLabel="Access Type"
              multiple
              onChange={handleSelectChange('accessType')}
              options={ACCESS_TYPE.map((type) => ({ label: type, value: type }))}
            />
          </Box>
          <FilterRange
            label="Year of publication"
            helpTooltip={`Filter by the year of publication. Inclusive the given min and max values.
      Papers without a year of publication are aggregated into Others in the barchart, if no filter is selected.`}
            labelStart="From"
            labelEnd="To"
            valueStart={filter.yearStart}
            valueEnd={filter.yearEnd}
            setValueStart={handleSelectChange('yearStart')}
            setValueEnd={handleSelectChange('yearEnd')}
          />
        </Box>
        <Divider />
        <Box marginTop={8} display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            startIcon={<CheckCircleTwoTone />}
            onClick={() => setFiltersContext(filterDispatch)({ filters: filter })}
          >
            Apply
          </Button>
          <Button variant="contained" startIcon={<CheckCircleTwoTone />} onClick={rest}>
            Cancle
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

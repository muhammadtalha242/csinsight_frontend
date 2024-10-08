'use client';

import { useContext, useState } from 'react';
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

export function Filters() {
  const {
    state: { isSideNavOpen },
    dispatch: applicatonDispatch,
  } = useContext(ApplicationContext);
  const theme = useTheme();
  const { dispatch: filterDispatch } = useContext(FilterContext);
  const [filter, setFilter] = useState<Filter>(intialFilter);

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
        | 'citationsMin'
        | 'citationsMax'
    ) =>
    (selectedOptions: string[] | string | null) => {
      setFilter((prev) => ({ ...prev, [name]: selectedOptions }));
    };

  const rest = () => {
    ClearFilter(filterDispatch)();
    setFilter(intialFilter);
  };

  return (
    <>
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
          position: 'fixed',
          scrollbarWidth: 'none',
          zIndex: 'var(--SideNav-zIndex)',
          '&::-webkit-scrollbar': { display: 'none' },
          flexShrink: 0,
          '.MuiDrawer-paperAnchorDockedRight': {
            width: 'var(--SideNav-width)',
            height: '100%',
            maxWidth: '100%',
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
            <FilterRange
              label="Citations Count"
              helpTooltip="Filter by the citations count. Inclusive the given min and max values."
              labelStart="Min"
              labelEnd="Max"
              valueStart={filter.citationsMin}
              valueEnd={filter.citationsMax}
              setValueStart={handleSelectChange('citationsMin')}
              setValueEnd={handleSelectChange('citationsMax')}
            />
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <Select
              route="authors"
              options={[]}
              helpTooltip="Filter by the authors.
        The pattern will only match the beginning of the name or after a whitespace.
        3 characters minimum are required; case-insensitive.
        Special characters (ä, é, ì, ...) need to be removed without replacement."
              inputLabel="Authors"
              onChange={handleSelectChange('authorIds')}
              multiple
            />
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <Select
              route="venues"
              inputLabel="Venues"
              helpTooltip="Filter by the venue.
        Matches any position in the name of the venue.
        3 characters minimum required; case-sensitive."
              multiple
              options={[]}
              onChange={handleSelectChange('venueIds')}
            />
          </Box>

          <Box sx={{ marginBottom: '16px' }}>
            <Select
              route="fieldsOfStudy"
              inputLabel="Field of Study"
              helpTooltip={
                'Filter by the field of study. One paper can have multiple fields of study, but most papers are in the field "Computer Science". ' +
                'Matches any position in the field; case-insensitive.'
              }
              multiple
              onChange={handleSelectChange('fieldsOfStudy')}
              options={FIELDS_OF_STUDY.map((field) => ({ label: field, value: field }))}
            />
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <Select
              route="typesOfPaper"
              inputLabel="Types of papers"
              helpTooltip="Filter by the type of paper (BibTeX type).
        Matches any position in the name of the type; case-insensitive."
              multiple
              onChange={handleSelectChange('typesOfPaper')}
              options={TYPES_OF_PAPER.map((type) => ({ label: type, value: type }))}
            />
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <Select
              route="accessTypes"
              inputLabel="Access Type"
              helpTooltip="Filter by the access type.
        Select from the given options."
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
    </>
  );
}

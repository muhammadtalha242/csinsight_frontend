'use client';

import * as React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Drawer, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { styled, useTheme } from '@mui/material/styles';

import { ApplicationContext, SetSideNavCollapsed } from '@/contexts/app.context';
import Select from '@/components/common/select';

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
  const options = [{ label: 'Option 1' }, { label: 'Option 2' }, { label: 'Option 3' }];
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
          <Select
            inputLabel="Authors"
            options={options}
            // getOptionLabel={(option) => option.label}
            // renderInput={(params) => <TextField {...params} label="Authors" />}
          />
        </Box>
      </Drawer>
    </Box>
  );
}

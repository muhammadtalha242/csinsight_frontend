'use client';

import { ReactNode, useContext } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import { styled } from '@mui/material/styles';

import { ApplicationContext } from '@/contexts/app.context';
import { MainNav } from '@/components/dashboard/layout/nav/main-nav';
import { Filters } from '@/components/filter/Filters';

interface LayoutProps {
  children: ReactNode;
}

const drawerWidth = 280;

export default function Layout({ children }: LayoutProps) {
  const {
    state: { isSideNavOpen },
  } = useContext(ApplicationContext);
  const Main = styled('main')(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(isSideNavOpen && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),

    position: 'relative',
  }));
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '64px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '320px',
            '--SideNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pr: { lg: 'var(--SideNav-width)' } }}>
          <MainNav />
          <Main>
            <Container sx={{ py: 'var(--MainNav-height)', minWidth: '100%' }}>{children}</Container>
          </Main>
        </Box>
        <Filters />
      </Box>
    </>
  );
}

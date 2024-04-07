import * as React from 'react';
import RouterLink from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { ApplicationContext, SetSideNavCollapsed } from '@/contexts/app.context';
import { Logo } from '@/components/core/logo';

import { navItems } from '../config';
import NavItem from './item-nav';
import { MobileNav } from './mobile-nav';

function renderNavItems({ items = [], pathname }: { items?: NavItemConfig[]; pathname: string }): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { key, ...item } = curr;

    acc.push(<NavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return <Stack sx={{ display: 'flex', flexDirection: 'row', m: 0, p: 0 }}>{children}</Stack>;
}

export function MainNav(): React.JSX.Element {
  const {
    state: { isSideNavOpen },
    dispatch: ApplicationDispatch,
  } = React.useContext(ApplicationContext);

  const [openNav, setOpenNav] = React.useState<boolean>(false);

  return (
    <>
      <MuiAppBar
        position="fixed"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          color: 'inherit',
          zIndex: 'var(--mui-zIndex-appBar)',
          minHeight: 'var(--MainNav-height)',
        }}
        component="header"
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: 'var(--MainNav-height)', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
            <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex', pl: '32px' }}>
              <Logo color="light" height={32} width={122} />
            </Box>
            {/* <Stack sx={{ display: 'flex', flexDirection: 'row', m: 0, p: 0 }}>
              {navItems.map((item) => {
                return <NavItem pathname={window.location.pathname} {...item} key={item.key} />;
              })}
            </Stack> */}
            {renderNavItems({ items: navItems, pathname: window.location.pathname })}
          </Stack>
          <Stack>
            <Tooltip title="Filters">
              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={() => {
                  SetSideNavCollapsed(ApplicationDispatch)({ isSideNavOpen: !isSideNavOpen });
                }}
                sx={{ ...(isSideNavOpen && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </MuiAppBar>

      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </>
  );
}

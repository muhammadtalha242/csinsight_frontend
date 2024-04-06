'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { ApplicationContext, SetSideNavCollapsed } from '@/contexts/app.context';
import { Logo } from '@/components/core/logo';

import { navItems } from './config';
import { MobileNav } from './mobile-nav';
import { navIcons } from './nav-icons';

function renderNavItems({ items = [], pathname }: { items?: NavItemConfig[]; pathname: string }): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { key, ...item } = curr;

    acc.push(<NavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return <Stack sx={{ display: 'flex', flexDirection: 'row', m: 0, p: 0 }}>{children}</Stack>;
}

interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname: string;
}

function NavItem({ disabled, external, href, icon, matcher, pathname, title }: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });

  const Icon = icon ? navIcons[icon] : null;

  return (
    <Box
      {...(href
        ? {
            component: external ? 'a' : RouterLink,
            href,
            target: external ? '_blank' : undefined,
            rel: external ? 'noreferrer' : undefined,
          }
        : { role: 'button' })}
      sx={{
        alignItems: 'center',
        borderRadius: 1,
        color: 'var(--NavItem-color)',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        gap: 1,
        p: '6px 16px',
        position: 'relative',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        ...(disabled && {
          bgcolor: 'var(--NavItem-disabled-background)',
          color: 'var(--NavItem-disabled-color)',
          cursor: 'not-allowed',
        }),
        ...(active && {
          bgcolor: 'var(--NavItem-active-background)',
          color: 'var(--NavItem-active-color)',
          outline: '2px solid',
        }),
        '&:hover': {
          outline: '2px solid',
          bgcolor: 'var(--NavItem-hover-background)',
          color: 'var(--NavItem-hover-color)',
        },
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
        {Icon ? (
          <Icon
            fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
            fontSize="var(--icon-fontSize-md)"
            weight={active ? 'fill' : undefined}
          />
        ) : null}
      </Box>
      <Box sx={{ flex: '1 1 auto' }}>
        <Typography
          component="span"
          sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
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

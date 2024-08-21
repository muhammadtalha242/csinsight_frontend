'use client';

import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import type { NavItemConfig } from '@/types/nav';

import { navIcons } from './nav-icons';

interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname?: string;
}

export default function NavItem({ disabled, external, href, icon, title }: NavItemProps) {
  const router = usePathname();
  const isActive = router === href;

  const Icon = icon ? navIcons[icon] : null;
  return (
    <Box
      {...(!disabled && href
        ? {
            component: RouterLink,
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
        ...(isActive && {
          bgcolor: 'var(--NavItem-active-background)',
          color: 'var(--NavItem-active-color)',
          border: '2px solid',
        }),
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
        {Icon ? (
          <Icon
            fill={isActive ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
            fontSize="var(--icon-fontSize-md)"
            weight={isActive ? 'fill' : undefined}
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

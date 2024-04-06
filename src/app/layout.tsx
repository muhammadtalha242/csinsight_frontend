'use client';

import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import { Provider as ApplicatonProvider } from '@/contexts/app.context';
import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <UserProvider>
            <ApplicatonProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </ApplicatonProvider>
          </UserProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}

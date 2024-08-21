'use client';

import type { Viewport } from 'next';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/global.css';

import { ReactNode } from 'react';

import { Provider as ApplicatonProvider } from '@/contexts/app.context';
import { Provider as FilterProvider } from '@/contexts/filters.context';
import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <QueryClientProvider client={queryClient}>
            <UserProvider>
              <ApplicatonProvider>
                <FilterProvider>
                  <ThemeProvider>{children}</ThemeProvider>
                </FilterProvider>
              </ApplicatonProvider>
            </UserProvider>
          </QueryClientProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}

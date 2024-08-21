'use client';

import type { ReactNode } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as Provider } from '@mui/x-date-pickers/LocalizationProvider';

export interface LocalizationProviderProps {
  children: ReactNode;
}

export function LocalizationProvider({ children }: LocalizationProviderProps) {
  return <Provider dateAdapter={AdapterDayjs}>{children}</Provider>;
}

import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import Papers from '@/components/dashboard/paper/Papers';

export const metadata = { title: `Papers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <Papers />;
}

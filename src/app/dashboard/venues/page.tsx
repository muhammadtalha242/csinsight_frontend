import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import Venues from '@/components/dashboard/venue/Venue';

export const metadata = { title: `Venues | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <Venues />;
}

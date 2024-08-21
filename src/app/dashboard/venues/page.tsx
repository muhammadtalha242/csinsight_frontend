import type { Metadata } from 'next';

import { config } from '@/config';
import Venues from '@/components/dashboard/venue/Venue';

export const metadata = { title: `Venues | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page() {
  return <Venues />;
}

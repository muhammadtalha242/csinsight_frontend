import type { Metadata } from 'next';

import { config } from '@/config';
import Papers from '@/components/dashboard/paper/Papers';

export const metadata = { title: `Papers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page() {
  return <Papers />;
}

import type { Metadata } from 'next';
import { config } from '@/config';
import Authors from '@/components/dashboard/author/Authors';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page() {
  return <Authors/>
}

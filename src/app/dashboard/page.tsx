import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import ResearchAreasDistribution from '@/components/dashboard/author/ResearchAreasDistribution';
import { PapersCount } from '@/components/dashboard/overview/papersCount';
import PublicationAreaChartWithSampleData from '@/components/dashboard/overview/PublicationAreaChart';
import S2FeidlOfStudy from '@/components/dashboard/overview/s2feildOfStudy';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import TopVenuesChart from '@/components/dashboard/venue/TopVenuesChart';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page() {
  return (
    <Grid container spacing={3}>
      <Grid lg={4} sm={6} xs={12}>
        <PapersCount sx={{ height: '100%' }} value="45M" />
      </Grid>
      <Grid lg={4} sm={6} xs={12}>
        <TotalCustomers sx={{ height: '100%' }} value="82M" />
      </Grid>
      <Grid lg={4} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="192K" />
      </Grid>
      <Grid lg={8} xs={12}>
        <PublicationAreaChartWithSampleData />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <S2FeidlOfStudy />
      </Grid>
      <Grid lg={6} md={6} xs={12}>
        {/* <DistributionsOverTime /> */}
        <TopVenuesChart />

      </Grid>
      <Grid lg={6} md={12} xs={12}>
        {/* <LatestOrders
          orders={[
            {
              id: 'ORD-007',
              customer: { name: 'Ekaterina Tankova' },
              amount: 30.5,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-006',
              customer: { name: 'Cao Yu' },
              amount: 25.1,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-004',
              customer: { name: 'Alexa Richardson' },
              amount: 10.99,
              status: 'refunded',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-003',
              customer: { name: 'Anje Keizer' },
              amount: 96.43,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-002',
              customer: { name: 'Clarke Gillebert' },
              amount: 32.54,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-001',
              customer: { name: 'Adam Denisov' },
              amount: 16.76,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        /> */}
        <ResearchAreasDistribution />
      </Grid>
    </Grid>
  );
}

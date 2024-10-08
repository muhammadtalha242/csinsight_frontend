'use client';

import React from 'react';
import { fetchResearchAreasDistribution, type ResearchAreasDistributionData } from '@/services/visualizations';
import { Alert, Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { useQuery } from 'react-query';

import { Chart } from '@/components/core/chart';

const ResearchAreasDistribution: React.FC = () => {
  const { data, isLoading, error } = useQuery<ResearchAreasDistributionData>(
    ['researchAreasDistribution'],
    fetchResearchAreasDistribution
  );

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center">
        <CircularProgress />
        <Typography variant="body1" ml={2}>
          Loading Research Areas Distribution...
        </Typography>
      </Box>
    );
  }

  if (error || !data) {
    return <Alert severity="error">Error loading Research Areas Distribution.</Alert>;
  }

  const series = data.counts;
  const options: ApexOptions = {
    chart: {
      type: 'donut',
      height: 350,
      toolbar: { show: true },
      zoom: {
        enabled: true,
        type: 'xy',
      },
    },
    labels: data.labels,
    title: {
      // text: 'Research Areas Distribution',
      align: 'center',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Research Areas Distribution
        </Typography>
        <Chart options={options} series={series} height={450} width="100%" type="donut" />
      </CardContent>
    </Card>
  );
};

export default ResearchAreasDistribution;

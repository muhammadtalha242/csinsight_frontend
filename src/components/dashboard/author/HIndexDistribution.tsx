'use client';

import React from 'react';
import { fetchHIndexDistribution, type HIndexDistributionData } from '@/services/visualizations';
import { Alert, Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { useQuery } from 'react-query';

import { Chart } from '@/components/core/chart';

const HIndexDistribution: React.FC = () => {
  const { data, isLoading, error } = useQuery<HIndexDistributionData>(['hIndexDistribution'], fetchHIndexDistribution);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center">
        <CircularProgress />
        <Typography variant="body1" ml={2}>
          Loading H-Index Distribution...
        </Typography>
      </Box>
    );
  }

  if (error || !data) {
    return <Alert severity="error">Error loading H-Index Distribution.</Alert>;
  }

  const series = [
    {
      name: 'Number of Authors',
      data: data.counts,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: true },
      zoom: {
        enabled: true,
        type: 'xy',
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.categories,

      title: {
        text: 'Number of Authors',
      },
    },
    yaxis: {
      title: {
        text: 'H-Index Range',
      },
    },
    title: {
      // text: 'Distribution of H-Index',
      align: 'center',
    },
    tooltip: {
      y: {
        formatter: (val: number) => `Authors: ${val.toString()}`,
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Distribution of H-Index
        </Typography>
        <Chart options={options} series={series} type="bar" width="100%" height={600} />
      </CardContent>
    </Card>
  );
};

export default HIndexDistribution;

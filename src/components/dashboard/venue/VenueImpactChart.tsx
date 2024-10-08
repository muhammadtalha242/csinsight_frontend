'use client';

import React, { useContext } from 'react';
import { fetchVenueImpact, type VenueImpact } from '@/services/visualizations';
import { Alert, Box, CircularProgress, Paper, Typography } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { useQuery } from 'react-query';

import { FilterContext } from '@/contexts/filters.context';
import { Chart } from '@/components/core/chart';

const VenueImpactChart: React.FC = () => {
  const { state: filterState } = useContext(FilterContext);
  const { data, isLoading, error } = useQuery<VenueImpact[]>(['venuesImpactAnalysis', filterState.filters], () =>
    fetchVenueImpact(filterState.filters)
  );

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center">
        <CircularProgress />
        <Typography variant="body1" ml={2}>
          Loading Venue Impact...
        </Typography>
      </Box>
    );
  }

  if (error || !data) {
    return <Alert severity="error">Error loading Venue Impact.</Alert>;
  }
  // Prepare data for the chart
  const venues = data?.map((item) => item.venue) || [];
  const averageCitations = data?.map((item) => item.averageCitations) || [];

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 450,
    },
    plotOptions: {
      bar: {
        columnWidth: '55%',
        // endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: venues,
      title: {
        text: 'Venues',
      },
    },
    yaxis: {
      decimalsInFloat: 0,
      title: {
        text: 'Average Citations',
      },
    },
    fill: {
      opacity: 1,
    },
    title: {
      text: 'Venue Impact Analysis (Average Citations per Venue)',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toFixed(2)} Citations`,
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '70%',
            },
          },
          chart: {
            height: 400,
          },
          title: {
            style: {
              fontSize: '16px',
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: 'Average Citations',
      data: averageCitations,
    },
  ];

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Chart options={chartOptions} series={series} type="bar" height={450} width="100%" />
    </Paper>
  );
};

export default VenueImpactChart;

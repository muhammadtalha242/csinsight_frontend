'use client';

import React, { useContext } from 'react';
import { fetchTopVenues, type IVenue } from '@/services/visualizations';
import { Alert, Box, CircularProgress, Paper, Typography } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { useQuery } from 'react-query';

import { FilterContext } from '@/contexts/filters.context';
import { Chart } from '@/components/core/chart';

const TopVenuesChart: React.FC = () => {
  const { state: filterState } = useContext(FilterContext);

  const { data, isLoading, error } = useQuery<IVenue[]>(['TopVenuesCharts', filterState.filters], () =>
    fetchTopVenues(filterState.filters)
  );

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center">
        <CircularProgress />
        <Typography variant="body1" ml={2}>
          Loading Top Venues...
        </Typography>
      </Box>
    );
  }

  if (error || !data) {
    return <Alert severity="error">Error loading Co-authorship Matrix.</Alert>;
  }

  // Prepare data for the chart
  const venueNames = data?.map((venue) => venue.venue) || [];
  const publicationCounts = data?.map((venue) => venue.publicationCount) || [];

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 450,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: false,
        borderRadius: 4,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    colors: ['#1E88E5'],
    dataLabels: {
      enabled: true,
      formatter(val: number) {
        return val.toString();
      },
      offsetX: 0,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: venueNames,
      title: {
        text: 'Number of Publications',
      },
    },
    yaxis: {
      title: {
        text: 'Venues',
      },
    },
    title: {
      text: 'Top Venues by Publication Count',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#263238',
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => `${val} Publications`,
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          chart: {
            height: 400,
          },
          dataLabels: {
            style: {
              fontSize: '10px',
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: 'Publications',
      data: publicationCounts,
    },
  ];

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Chart options={chartOptions} series={series} type="bar" height={450} width="100%" />
    </Paper>
  );
};

export default TopVenuesChart;

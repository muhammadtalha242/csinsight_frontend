'use client';

import React, { useContext, useState } from 'react';
import { fetchTopVenues, type IVenue } from '@/services/visualizations';
import { Alert, Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { useQuery } from 'react-query';

import { FilterContext } from '@/contexts/filters.context';
import ChartDescriptionDialog, { infoIcon } from '@/components/common/ChartDescriptionDialog';
import { Chart } from '@/components/core/chart';

const TopVenuesChart: React.FC = () => {
  const { state: filterState } = useContext(FilterContext);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      height: 400,
      toolbar: {
        show: true,
        tools: {
          customIcons: [
            {
              icon: infoIcon,
              click: () => {
                handleOpen();
              },
              title: 'More information about the chart',
              index: -1,
            },
          ],
        },
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
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" gutterBottom>
            Top Venues by Publication Count
          </Typography>
        </Box>
        <Chart options={chartOptions} series={series} type="bar" height={400} width="100%" />
      </CardContent>
      <ChartDescriptionDialog
        open={open}
        onClose={handleClose}
        description="Identifies venues (journals, conferences) with the highest number of publications, helping researchers find active publication outlets."
      />
    </Card>
  );
};

export default TopVenuesChart;

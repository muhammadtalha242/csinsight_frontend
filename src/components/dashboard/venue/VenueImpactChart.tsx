'use client';

import React, { useContext, useState } from 'react';
import { fetchVenueImpact, type VenueImpact } from '@/services/visualizations';
import { Alert, Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { useQuery } from 'react-query';

import { FilterContext } from '@/contexts/filters.context';
import ChartDescriptionDialog, { infoIcon } from '@/components/common/ChartDescriptionDialog';
import { Chart } from '@/components/core/chart';

const VenueImpactChart: React.FC = () => {
  const { state: filterState } = useContext(FilterContext);
  const { data, isLoading, error } = useQuery<VenueImpact[]>(['venuesImpactAnalysis', filterState.filters], () =>
    fetchVenueImpact(filterState.filters)
  );

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" gutterBottom>
            Venue Impact Analysis (Average Citations per Venue)
          </Typography>
        </Box>
        <Chart options={chartOptions} series={series} type="bar" height={450} width="100%" />
      </CardContent>
      <ChartDescriptionDialog
        open={open}
        onClose={handleClose}
        description="Assesses the average number of citations per venue to identify influential or prestigious publication outlets."
      />
    </Card>
  );
};

export default VenueImpactChart;

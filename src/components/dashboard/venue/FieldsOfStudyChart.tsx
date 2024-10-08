'use client';

import React, { useContext, useMemo } from 'react';
import { fetchFieldsOfStudyDistribution, type FieldOfStudyDistribution } from '@/services/visualizations';
import { Alert, Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { useQuery } from 'react-query';

import { FilterContext } from '@/contexts/filters.context';
import { Chart } from '@/components/core/chart';

interface ChartData {
  categories: string[]; // Venue IDs or Names
  series: { name: string; data: number[] }[]; // Fields of Study and their counts per venue
}

const FieldsOfStudyChart: React.FC = () => {
  const { state: filterState } = useContext(FilterContext);
  const { data, isLoading, error } = useQuery<FieldOfStudyDistribution[]>(
    ['fetchFieldsOfStudyDistribution', filterState.filters],
    () => fetchFieldsOfStudyDistribution(filterState.filters)
  );

  const chartData: ChartData = useMemo(() => {
    if (!data) return { categories: [], series: [] };

    // Get unique venues
    const venues = Array.from(new Set(data.map((item) => item.venue)));

    // Get unique fields of study
    const fields = Array.from(new Set(data.map((item) => item.fieldOfStudy)));

    // Initialize series with each field as a separate series
    const series = fields.map((field) => ({
      name: field,
      data: venues.map((venue) => {
        const record = data.find((item) => item.venue === venue && item.fieldOfStudy === field);
        return record ? record.count : 0;
      }),
    }));

    return {
      categories: venues,
      series,
    };
  }, [data]);

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
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 500,
      stacked: true,
      toolbar: { show: true },
      zoom: {
        enabled: true,
        type: 'xy'
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: false,
        borderRadius: 4,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }, 
          position: 'center', 
        },
      },
    },
    xaxis: {
      categories: chartData.categories,
      title: {
        text: 'Venues',
      },
      labels: {
        rotate: -45,
      },
      tickPlacement: 'on',
    },
    yaxis: {
      title: {
        text: 'Number of Papers',
      },
    },
    legend: {
      position: 'bottom',
      offsetY: 10,
    },
    title: {
      text: 'Fields of Study Distribution by Venue',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} Papers`,
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '60%',
            },
          },
          legend: {
            position: 'bottom',
            offsetY: 0,
          },
        },
      },
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: '60%',
            },
          },
          legend: {
            position: 'bottom',
            offsetY: 0,
          },
          xaxis: {
            labels: {
              rotate: 0,
            },
          },
        },
      },
    ],
    colors: [
      '#1E88E5',
      '#D81B60',
      '#FFC107',
      '#43A047',
      '#F4511E',
      '#7B1FA2',
      '#00ACC1',
      '#8BC34A',
      '#FF7043',
      '#5C6BC0',
      // Add more colors as needed
    ],
  };

  const series = chartData.series;

  return (
    <Card>
      <CardContent>
        <Chart options={chartOptions} series={series} type="bar" height={560} width="100%" />
      </CardContent>
    </Card>
  );
};

export default FieldsOfStudyChart;

'use client';

import * as React from 'react';
import { LinearProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

export interface LineChartProps {
  chartSeries: { name: string; data: number[] }[];
  sx?: SxProps;
  title: string;
  xAxisCategories: string[];
  isLoading: boolean;
}

export function LineChart({ chartSeries, sx, title, xAxisCategories, isLoading }: LineChartProps): React.JSX.Element {
  const chartOptions = useChartOptions(xAxisCategories);

  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
            Sync
          </Button>
        }
        title={title}
      />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <CardContent>
            <Chart height={350} options={chartOptions} series={chartSeries} type="line" width="100%" />
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button color="inherit" endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />} size="small">
              Overview
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}

function useChartOptions(xAxisCategories: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: { show: true, autoSelected: 'zoom' },
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: 'solid' },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: true },
    plotOptions: { bar: { columnWidth: '40px' } },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 2,
    },
    theme: { mode: theme.palette.mode },
    xaxis: {
      title: { text: 'Years' },
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      categories: xAxisCategories,
      labels: {
        offsetY: 5,
        style: { colors: theme.palette.text.secondary },
        hideOverlappingLabels: true,
      },
    },
    yaxis: {
      title: { text: 'Total Citations', offsetY: 10 },
      labels: {
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}

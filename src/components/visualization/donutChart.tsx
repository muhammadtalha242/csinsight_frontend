'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

export interface DonutChartProps {
  chartSeries: number[];
  labels: string[];
  sx?: SxProps;
  title: string;
}

export function DonutChart({ chartSeries, labels, sx, title }: DonutChartProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title={title} />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={400} options={chartOptions} series={chartSeries} type="donut" width="100%" />
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent' },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main,
    ],
    dataLabels: { enabled: false },
    labels,
    legend: {
      show: true,
      onItemHover: { highlightDataSeries: true },
      position: 'bottom',
      offsetY: 10,
    },
    plotOptions: { pie: { expandOnClick: true } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}

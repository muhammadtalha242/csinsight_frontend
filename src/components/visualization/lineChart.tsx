'use client';

import { CircularProgress, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { Box } from '@mui/system';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

export interface LineChartProps {
  chartSeries: { name: string; data: number[] }[];
  sx?: SxProps;
  title: string;
  xAxisCategories: string[];
  isLoading: boolean;
}

export function LineChart({ chartSeries, sx, title, xAxisCategories, isLoading }: LineChartProps) {
  const chartOptions = useChartOptions(xAxisCategories);

  return (
    <Card sx={sx}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 440 }}>
          {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
        </Box>
      ) : (
        <>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Chart height={350} options={chartOptions} series={chartSeries} type="line" width="100%" />
          </CardContent>
          <Divider />
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
      title: { text: 'Total Citations', offsetX: 10 },
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}

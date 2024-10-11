'use client';

import { CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { Box } from '@mui/system';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

export interface DonutChartProps {
  chartSeries: number[];
  labels: string[];
  sx?: SxProps;
  title: string;
  isLoading: boolean;
}

export function DonutChart({ chartSeries, labels, sx, title, isLoading }: DonutChartProps) {
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title={title} />
      <CardContent>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
            {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
          </Box>
        ) : (
          <Chart height={400} options={chartOptions} series={chartSeries} type="donut" width="100%" />
        )}
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
    // dataLabels: { enabled: false },
    labels,
    legend: {
      show: true,
      onItemHover: { highlightDataSeries: true },
      position: 'bottom',
      offsetY: -10,
    },
    plotOptions: { pie: { expandOnClick: true } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}

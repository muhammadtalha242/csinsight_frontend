'use client';

import React, { useState } from 'react';
import { fetchResearchAreasDistribution, type ResearchAreasDistributionData } from '@/services/visualizations';
import { Alert, Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { useQuery } from 'react-query';

import ChartDescriptionDialog, { infoIcon } from '@/components/common/ChartDescriptionDialog';
import { Chart } from '@/components/core/chart';

const ResearchAreasDistribution: React.FC = () => {
  const { data, isLoading, error } = useQuery<ResearchAreasDistributionData>(
    ['researchAreasDistribution'],
    fetchResearchAreasDistribution
  );

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center">
        <CircularProgress />
        <Typography variant="body1" ml={2}>
          Loading Research Areas Distribution...
        </Typography>
      </Box>
    );
  }

  if (error || !data) {
    return <Alert severity="error">Error loading Research Areas Distribution.</Alert>;
  }

  const series = data.counts;
  const options: ApexOptions = {
    chart: {
      type: 'donut',
      height: 350,
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
      zoom: {
        enabled: true,
        type: 'xy',
      },
    },
    labels: data.labels,
    title: {
      align: 'center',
    },
    legend: {
      position: 'bottom',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" gutterBottom>
            Research Areas Distribution
          </Typography>
        </Box>
        <Chart options={options} series={series} height={400} width="100%" type="donut" />
      </CardContent>

      <ChartDescriptionDialog
        open={open}
        onClose={handleClose}
        description="This chart displays the distribution of research areas based on the provided data. Each slice represents a different research area, with the size of the slice indicating the proportion of that area relative to the total. The legend below shows the labels for each area."
      />
    </Card>
  );
};

export default ResearchAreasDistribution;

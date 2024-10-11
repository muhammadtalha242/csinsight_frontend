'use client';

import React, { useContext, useState } from 'react';
import { fetchPublicationsCitationsData, type PublicationsCitationsData } from '@/services/visualizations';
import { Alert, Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import { useQuery } from 'react-query';

import { FilterContext } from '@/contexts/filters.context';
import ChartDescriptionDialog, { infoIcon } from '@/components/common/ChartDescriptionDialog';
import { Chart } from '@/components/core/chart';

const PublicationsCitationsCorrelation: React.FC = () => {
  const { state: filterState } = useContext(FilterContext);

  const { data, isLoading, error } = useQuery<PublicationsCitationsData[], Error>(
    ['publicationsCitations', filterState.filters],
    () =>
      fetchPublicationsCitationsData({
        ...filterState.filters,
      })
  );
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if (isLoading) {
    return (
      <Box display="flex" alignItems="center">
        <CircularProgress />
        <Typography variant="body1" ml={2}>
          Loading Publications vs. Citations...
        </Typography>
      </Box>
    );
  }

  if (error || !data) {
    return <Alert severity="error">Error loading Publications vs. Citations.</Alert>;
  }

  const series = [
    {
      name: 'Authors',
      data: data.map((item) => ({
        x: item.x,
        y: item.y,
        name: item.name,
      })),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'scatter',
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
      zoom: {
        enabled: true,
        type: 'xy',
      },
    },
    title: {
      // text: 'Correlation: Publications vs. Citations',
      align: 'center',
    },
    xaxis: {
      title: {
        text: 'Number of Publications',
      },
      tickAmount: 10,
      min: 0,
    },
    yaxis: {
      title: {
        text: 'Total Citations',
      },
      tickAmount: 10,
      min: 0,
    },
    tooltip: {
      custom({ seriesIndex, dataPointIndex }) {
        const point = series[seriesIndex].data[dataPointIndex];
        return `<div style="padding:10px;">
                  <strong>${point.name}</strong><br/>
                  Publications: ${point.x}<br/>
                  Citations: ${point.y}
                </div>`;
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Correlation: Publications vs. Citations
        </Typography>
        <Chart options={options} series={series} type="scatter" height={450} width="100%" />
      </CardContent>
      <ChartDescriptionDialog
        open={open}
        onClose={handleClose}
        description="This scatter plot highlights how an author's productivity relates to the impact of their work, enabling users to identify trends, clusters, and outliers in research influence and productivity."
      />
    </Card>
  );
};

export default PublicationsCitationsCorrelation;

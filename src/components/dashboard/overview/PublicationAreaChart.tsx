'use client';

import React, { useContext, useState } from 'react';
import { fetchPublicationsVenue, type PublicationData, type WidePublicationData } from '@/services/visualizations';
import { Alert, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { type ApexOptions } from 'apexcharts';
import { useQuery } from 'react-query';

import { FilterContext } from '@/contexts/filters.context';
import ChartDescriptionDialog, { infoIcon } from '@/components/common/ChartDescriptionDialog';
import { Chart } from '@/components/core/chart';

const PublicationAreaChart: React.FC = () => {
  const { state: filterState } = useContext(FilterContext);
  const [open, setOpen] = useState(false);
  const [activeVenues, setActiveVenues] = useState<string[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    data: publicationData,
    isLoading,
    error,
  } = useQuery<PublicationData[]>(['TopPublicationsVenuesArea', filterState.filters], () =>
    fetchPublicationsVenue(filterState.filters)
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

  if (error || !publicationData) {
    return <Alert severity="error">Error loading Top Publications Venues Area data.</Alert>;
  }

  // Step 1: Calculate total publications per venue
  const venueTotal: Record<string, number> = publicationData.reduce((acc: Record<string, number>, curr) => {
    acc[curr.venue] = (acc[curr.venue] || 0) + curr.paper_count;
    return acc;
  }, {});

  // Step 2: Identify top 5 venues
  const top5Venues = Object.entries(venueTotal)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([venue]) => venue);

  // Step 3: Pivot data to wide format and handle missing venues
  const wideData: WidePublicationData[] = [];
  publicationData.forEach((record) => {
    if (top5Venues.includes(record.venue)) {
      let yearEntry = wideData.find((entry) => entry.publication_year === record.publication_year);
      if (!yearEntry) {
        yearEntry = { publication_year: record.publication_year };
        top5Venues.forEach((venue) => {
          yearEntry![venue] = 0;
        });
        wideData.push(yearEntry);
      }
      yearEntry[record.venue] = (yearEntry[record.venue] || 0) + record.paper_count;
    }
  });

  // Sort the data by publication_year
  const sortedData = wideData.sort((a, b) => a.publication_year - b.publication_year);

  // Initialize active venues if not done
  if (activeVenues.length === 0) {
    setActiveVenues(top5Venues);
  }

  // Define colors for the top 5 venues
  const COLORS = ['#008FFB', '#00E396', '#CED4DC', '#FF4560', '#FEB019'];

  // Handler to toggle venue visibility
  const _handleLegendClick = (venue: string) => {
    if (activeVenues.includes(venue)) {
      setActiveVenues(activeVenues.filter((v) => v !== venue));
    } else {
      setActiveVenues([...activeVenues, venue]);
    }
  };

  // Prepare ApexCharts series
  const series = top5Venues.map((venue, _index) => ({
    name: venue,
    data: sortedData.map((entry) => ({
      x: new Date(entry.publication_year, 0, 1).getTime(),
      y: activeVenues.includes(venue) ? entry[venue] : 0,
    })),
  }));

  // ApexCharts options
  const options: ApexOptions = {
    chart: {
      type: 'area',
      stacked: true,
      toolbar: {
        show: true,
        tools: {
          customIcons: [
            {
              icon: infoIcon,
              click: handleOpen,
              title: 'More information about the chart',
              index: -1,
            },
          ],
        },
      },
    },
    colors: COLORS,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'yyyy',
      },
    },
    yaxis: {
      title: {
        text: 'Number of Publications',
      },
    },
    tooltip: {
      x: {
        format: 'yyyy',
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Publications Over Time by Top 5 Venues
        </Typography>
        <Chart options={options} series={series} type="area" height={400} width="100%" />
        <ChartDescriptionDialog
          open={open}
          onClose={handleClose}
          description="This chart displays the number of publications over time for the top 5 venues based on the total number of publications. The area chart shows the yearly distribution of publications in these venues."
        />
      </CardContent>
    </Card>
  );
};

export default PublicationAreaChart;

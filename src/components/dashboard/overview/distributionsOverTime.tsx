'use client';

import React from 'react';

import { LineChart } from '@/components/visualization/lineChart';

import sampleData from './sample.data.json';

const DistributionsOverTime = () => {
  const graphData: number[] = [];
  const xAxisCategories: string[] = [];

  sampleData.forEach((v: { count: number; totalCitations: number; year: string }) => {
    graphData.push(v.totalCitations);
    xAxisCategories.push(v.year);
  });

  return (
    <LineChart
      chartSeries={[{ name: 'This year', data: graphData }]}
      sx={{ height: '100%' }}
      title="Bar Chart"
      xAxisCategories={xAxisCategories}
    />
  );
};

export default DistributionsOverTime;

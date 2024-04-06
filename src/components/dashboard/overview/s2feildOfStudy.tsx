'use client';

import React from 'react';

import { DonutChart } from '@/components/visualization/donutChart';

import sampleData from './s2f.data.json';

const S2FeidlOfStudy = () => {
  const graphData: number[] = [];
  const xAxisCategories: string[] = [];
  sampleData.forEach((v: { category: string; category_count: number }) => {
    graphData.push(v.category_count);
    xAxisCategories.push(v.category);
  });

  return <DonutChart chartSeries={graphData} sx={{ height: '100%' }} title="S2Field Chart" labels={xAxisCategories} />;
};

export default S2FeidlOfStudy;

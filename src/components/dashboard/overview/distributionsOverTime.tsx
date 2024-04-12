'use client';

import React, { useContext } from 'react';
import visualizationsService, { type getPapersCountsPostResponse } from '@/services/visualizations';
import { useQuery } from 'react-query';

import { FilterContext } from '@/contexts/filters.context';
import { LineChart } from '@/components/visualization/lineChart';

const DistributionsOverTime = () => {
  const { state: filterState } = useContext(FilterContext);

  const graphData: number[] = [];
  const xAxisCategories: string[] = [];

  const { data, isLoading, error } = useQuery<getPapersCountsPostResponse[], Error>(
    ['myData2', filterState.filters],
    () => visualizationsService.getPapersCountPost(filterState.filters)
  );

  if (!isLoading && data) {
    data.forEach((v: getPapersCountsPostResponse) => {
      graphData.push(v.count);
      xAxisCategories.push(v.year);
    });
  }
  if (error) return <>MISSING DATA</>;

  return (
    <LineChart
      isLoading={isLoading}
      chartSeries={[{ name: 'This year', data: graphData }]}
      sx={{ height: '100%' }}
      title="Bar Chart"
      xAxisCategories={xAxisCategories}
    />
  );
};

export default DistributionsOverTime;

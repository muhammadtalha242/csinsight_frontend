'use client';

import React, { useContext } from 'react';
import visualizationsService, { type getS2FeildResponse } from '@/services/visualizations';
import { useQuery } from 'react-query';

import { FilterContext } from '@/contexts/filters.context';
import { DonutChart } from '@/components/visualization/donutChart';

const S2FeidlOfStudy = () => {
  const { state: filterState } = useContext(FilterContext);
  const graphData: number[] = [];
  const xAxisCategories: string[] = [];

  const { data, isLoading } = useQuery<getS2FeildResponse[], Error>(['s2F', filterState.filters], () =>
    visualizationsService.getS2Feilds({
      ...filterState.filters,
    })
  );

  if (!isLoading && data) {
    data.forEach((v: getS2FeildResponse) => {
      graphData.push(Number(v.category_count));
      xAxisCategories.push(v.category);
    });
  }
  return (
    <DonutChart
      chartSeries={graphData}
      sx={{ height: '100%' }}
      title="S2Field Chart"
      labels={xAxisCategories}
      isLoading={isLoading}
    />
  );
};

export default S2FeidlOfStudy;

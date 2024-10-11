// // src/components/CoauthorshipMatrix.tsx
// 'use client';

// import React from 'react';
// import { fetchCoauthorshipMatrix, type CoauthorshipMatrixData } from '@/services/visualizations';
// import { Alert, Box, CircularProgress, Typography } from '@mui/material';
// import type { ApexOptions } from 'apexcharts';
// import { useQuery } from 'react-query';

// import { Chart } from '@/components/core/chart';

// const CoauthorshipMatrix: React.FC = () => {
//   const { data, isLoading, error } = useQuery<CoauthorshipMatrixData>(['coauthorshipMatrix'], fetchCoauthorshipMatrix);

//   if (isLoading) {
//     return (
//       <Box display="flex" alignItems="center">
//         <CircularProgress />
//         <Typography variant="body1" ml={2}>
//           Loading Co-authorship Matrix...
//         </Typography>
//       </Box>
//     );
//   }

//   if (error || !data) {
//     return <Alert severity="error">Error loading Co-authorship Matrix.</Alert>;
//   }

//   const series = data.series.map((author) => ({
//     name: author.name,
//     data: author.data.map((count, idx) => ({
//       x: data.categories[idx],
//       y: count,
//     })),
//   }));

//   const options: ApexOptions = {
//     chart: {
//       type: 'heatmap',
//       height: 450,
//     },
//     plotOptions: {
//       heatmap: {
//         shadeIntensity: 0.5,
//         radius: 0,
//         useFillColorAsStroke: true,
//         colorScale: {
//           ranges: [
//             { from: 0, to: 1, name: 'Low', color: '#f0f0f0' },
//             { from: 2, to: 3, name: 'Medium', color: '#00A100' },
//             { from: 4, to: 5, name: 'High', color: '#128FD9' },
//             { from: 6, to: Number.MAX_VALUE, name: 'Very High', color: '#FFB200' },
//           ],
//         },
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     xaxis: {
//       type: 'category',
//       labels: {
//         rotate: -45,
//         style: {
//           fontSize: '10px',
//         },
//       },
//       title: {
//         text: 'Authors',
//       },
//     },
//     yaxis: {
//       title: {
//         text: 'Authors',
//       },
//       labels: {
//         style: {
//           fontSize: '10px',
//         },
//       },
//     },
//     title: {
//       text: 'Co-authorship Matrix',
//       align: 'center',
//     },
//     tooltip: {
//       y: {
//         formatter: (val: number) => `Collaborations: ${val}`,
//       },
//     },
//   };

//   return (
//     <Box>
//       <Typography variant="h6" gutterBottom>
//         Co-authorship Matrix
//       </Typography>
//       <Chart options={options} series={series} type="heatmap" height={450} width="100%" />
//     </Box>
//   );
// };

// export default CoauthorshipMatrix;

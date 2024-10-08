// // src/components/SankeyDiagram.tsx

// import React, { useEffect, useRef } from 'react';
// import { fetchSankeyData, type SankeyData, type SankeyEdge, type SankeyNode } from '@/services/visualizations';
// import { Box, CircularProgress, Typography } from '@mui/material';
// import ApexSankey from 'apexsankey';
// import { useQuery } from 'react-query';

// // Define TypeScript interfaces for clarity and type safety
// // interface SankeyNode {
// //   id: string;
// //   title: string;
// // }

// // interface SankeyEdge {
// //   source: string;
// //   target: string;
// //   value: number;
// //   type?: string;
// // }

// interface SankeyOptions {
//   order: string[][];
//   width?: number;
//   height?: number;
//   canvasStyle?: string;
//   spacing?: number;
//   nodeWidth?: number;
// }

// const SankeyDiagram: React.FC = () => {
//   const sankeyContainerRef = useRef<HTMLDivElement>(null); // Reference to the Sankey container
//   const sankeyInstanceRef = useRef<ApexSankey | null>(null); // Reference to the ApexSankey instance

//   // Fetch Sankey data using React Query
//   //   const { data, isLoading, error } = useQuery<SankeyData>(['sankeyData'], fetchSankeyData, {
//   //     // Optional React Query configurations
//   //     staleTime: 5 * 60 * 1000, // 5 minutes
//   //     cacheTime: 30 * 60 * 1000, // 30 minutes
//   //     retry: 2, // Retry failed requests up to 2 times
//   //   });
//   const data = {
//     nodes: [
//       {
//         id: 'a',
//         title: 'AAA',
//       },
//       {
//         id: 'b',
//         title: 'BBB',
//       },
//       {
//         id: 'c',
//         title: 'CCC',
//       },
//     ],
//     edges: [
//       {
//         source: 'a',
//         target: 'c',
//         value: 1,
//         type: 'A',
//       },
//       {
//         source: 'b',
//         target: 'c',
//         value: 2,
//         type: 'A',
//       },
//     ],
//     options: {
//       order: [[['a', 'b']], [['c']]],
//     },
//   };
//   useEffect(() => {
//     if (sankeyContainerRef.current && data) {
//       // Prepare nodes and links for ApexSankey
//       const nodes: SankeyNode[] = data.nodes.map((node) => ({
//         id: node.id,
//         title: node.title,
//       }));

//       const links: SankeyEdge[] = data.edges.map((link: SankeyEdge) => ({
//         source: link.source,
//         target: link.target,
//         value: link.value,
//         type: link.type,
//       }));

//       //   // Define Sankey options
//       //   const options: ApexSankey['options'] = {
//       //     order: data.options.order,
//       //     width: data.options.width || 800,
//       //     height: data.options.height || 600,
//       //     canvasStyle: data.options.canvasStyle || 'border: 1px solid #caced0; background: #f6f6f6;',
//       //     spacing: data.options.spacing || 100,
//       //     nodeWidth: data.options.nodeWidth || 20,
//       //   };
//       const options = {
//         width: 800,
//         height: 800,
//         canvasStyle: 'border: 1px solid #caced0; background: #f6f6f6;',
//         spacing: 100,
//         nodeWidth: 20,
//         nodeBorderWidth: 1,
//         nodeBorderColor: 'blue'
//       };

//       // Initialize ApexSankey instance
//       sankeyInstanceRef.current = new ApexSankey(sankeyContainerRef.current, options);

//       // Render the Sankey diagram
//       sankeyInstanceRef.current.render(data);
//     }

//     // Cleanup function to destroy the ApexSankey instance on unmount
//     return () => {
//       if (sankeyInstanceRef.current) {
//         sankeyInstanceRef.current.destroy();
//         sankeyInstanceRef.current = null;
//       }
//     };
//   }, [data]); // Re-run the effect when data changes

//   // Render loading state
//   if (isLoading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height={450}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Render error state
//   if (error || !data) {
//     return <Typography color="error">Error loading Sankey diagram data.</Typography>;
//   }

//   return (
//     <Box>
//       <Typography variant="h6" gutterBottom>
//         Collaborations Between Research Areas
//       </Typography>
//       <div ref={sankeyContainerRef}></div>
//     </Box>
//   );
// };

// export default SankeyDiagram;

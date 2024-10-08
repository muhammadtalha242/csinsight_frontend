'use client';

import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { type ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

// TypeScript Interface Definitions

export interface PublicationData {
  publication_year: number;
  venue: string;
  paper_count: number;
}

export interface WidePublicationData {
  publication_year: number;
  [venue: string]: number | undefined;
}

interface PublicationAreaChartProps {
  publicationData: PublicationData[];
}

export const PUBLICATIONDATA = [
  { publication_year: 2000, venue: 'Journal of Biological Chemistry', paper_count: 1268 },
  { publication_year: 2000, venue: 'Science', paper_count: 1045 },
  { publication_year: 2000, venue: 'British medical journal', paper_count: 924 },
  { publication_year: 2000, venue: 'The Lancet', paper_count: 837 },
  { publication_year: 2000, venue: 'Physical Review Letters', paper_count: 676 },
  { publication_year: 2001, venue: 'Journal of Biological Chemistry', paper_count: 1423 },
  { publication_year: 2001, venue: 'Science', paper_count: 1011 },
  { publication_year: 2001, venue: 'British medical journal', paper_count: 918 },
  { publication_year: 2001, venue: 'The Lancet', paper_count: 830 },
  { publication_year: 2001, venue: 'Physical Review Letters', paper_count: 694 },
  { publication_year: 2002, venue: 'Journal of Biological Chemistry', paper_count: 1472 },
  { publication_year: 2002, venue: 'British medical journal', paper_count: 1063 },
  { publication_year: 2002, venue: 'Science', paper_count: 1040 },
  {
    publication_year: 2002,
    venue: 'Proceedings of the National Academy of Sciences of the United States of America',
    paper_count: 685,
  },
  { publication_year: 2002, venue: 'The Lancet', paper_count: 681 },
  { publication_year: 2003, venue: 'Journal of Biological Chemistry', paper_count: 1425 },
  { publication_year: 2003, venue: 'British medical journal', paper_count: 1059 },
  { publication_year: 2003, venue: 'Science', paper_count: 1016 },
  { publication_year: 2003, venue: 'Physical Review Letters', paper_count: 712 },
  {
    publication_year: 2003,
    venue: 'Proceedings of the National Academy of Sciences of the United States of America',
    paper_count: 649,
  },
  { publication_year: 2004, venue: 'Journal of Biological Chemistry', paper_count: 1437 },
  { publication_year: 2004, venue: 'British medical journal', paper_count: 1148 },
  { publication_year: 2004, venue: 'Science', paper_count: 985 },
  { publication_year: 2004, venue: 'Physical Review Letters', paper_count: 783 },
  {
    publication_year: 2004,
    venue: 'Proceedings of the National Academy of Sciences of the United States of America',
    paper_count: 680,
  },
  { publication_year: 2005, venue: 'Journal of Biological Chemistry', paper_count: 1140 },
  { publication_year: 2005, venue: 'British medical journal', paper_count: 1121 },
  { publication_year: 2005, venue: 'Science', paper_count: 1061 },
  { publication_year: 2005, venue: 'Physical Review Letters', paper_count: 775 },
  { publication_year: 2005, venue: 'Journal of the American Chemical Society', paper_count: 744 },
  { publication_year: 2006, venue: 'British medical journal', paper_count: 1100 },
  { publication_year: 2006, venue: 'Science', paper_count: 1044 },
  { publication_year: 2006, venue: 'Journal of Biological Chemistry', paper_count: 994 },
  { publication_year: 2006, venue: 'Journal of Clinical Oncology', paper_count: 917 },
  { publication_year: 2006, venue: 'Physical Review Letters', paper_count: 844 },
  { publication_year: 2007, venue: 'Science', paper_count: 989 },
  { publication_year: 2007, venue: 'British medical journal', paper_count: 961 },
  {
    publication_year: 2007,
    venue: 'Proceedings of the National Academy of Sciences of the United States of America',
    paper_count: 840,
  },
  { publication_year: 2007, venue: 'Journal of Biological Chemistry', paper_count: 833 },
  { publication_year: 2007, venue: 'Physical Review Letters', paper_count: 778 },
  { publication_year: 2008, venue: 'Science', paper_count: 980 },
  { publication_year: 2008, venue: 'British medical journal', paper_count: 915 },
  {
    publication_year: 2008,
    venue: 'Proceedings of the National Academy of Sciences of the United States of America',
    paper_count: 899,
  },
  { publication_year: 2008, venue: 'Journal of Biological Chemistry', paper_count: 854 },
  { publication_year: 2008, venue: 'Physical Review Letters', paper_count: 825 },
  { publication_year: 2009, venue: 'Acta Medica Scandinavica', paper_count: 1361 },
  { publication_year: 2009, venue: 'Asian Test Symposium', paper_count: 1171 },
  { publication_year: 2009, venue: 'PLoS ONE', paper_count: 1006 },
  { publication_year: 2009, venue: 'Journal of Biological Chemistry', paper_count: 993 },
  {
    publication_year: 2009,
    venue: 'Proceedings of the National Academy of Sciences of the United States of America',
    paper_count: 977,
  },
  { publication_year: 2010, venue: 'PLoS ONE', paper_count: 1534 },
  { publication_year: 2010, venue: 'Asian Test Symposium', paper_count: 1249 },
  { publication_year: 2010, venue: 'Journal of Biological Chemistry', paper_count: 1026 },
  { publication_year: 2010, venue: 'British medical journal', paper_count: 956 },
  {
    publication_year: 2010,
    venue: 'Proceedings of the National Academy of Sciences of the United States of America',
    paper_count: 909,
  },
  { publication_year: 2011, venue: 'PLoS ONE', paper_count: 3133 },
  { publication_year: 2011, venue: 'Journal of Clinical Oncology', paper_count: 1475 },
  { publication_year: 2011, venue: 'Asian Test Symposium', paper_count: 1199 },
  { publication_year: 2011, venue: 'British medical journal', paper_count: 1038 },
  { publication_year: 2011, venue: 'Acta Crystallographica Section E', paper_count: 966 },
  { publication_year: 2012, venue: 'PLoS ONE', paper_count: 5304 },
  { publication_year: 2012, venue: 'Other Conferences', paper_count: 1321 },
  { publication_year: 2012, venue: 'arXiv.org', paper_count: 1284 },
  { publication_year: 2012, venue: 'Asian Test Symposium', paper_count: 1251 },
  { publication_year: 2012, venue: 'British medical journal', paper_count: 1087 },
  { publication_year: 2013, venue: 'PLoS ONE', paper_count: 7169 },
  { publication_year: 2013, venue: 'arXiv.org', paper_count: 1429 },
  {
    publication_year: 2013,
    venue: 'Proceedings of the National Academy of Sciences of the United States of America',
    paper_count: 1067,
  },
  { publication_year: 2013, venue: 'Nature', paper_count: 875 },
  { publication_year: 2013, venue: 'British medical journal', paper_count: 838 },
  { publication_year: 2014, venue: 'PLoS ONE', paper_count: 6933 },
  { publication_year: 2014, venue: 'arXiv.org', paper_count: 1673 },
  { publication_year: 2014, venue: 'British medical journal', paper_count: 987 },
  { publication_year: 2014, venue: 'Scientific Reports', paper_count: 927 },
  { publication_year: 2014, venue: 'Nature', paper_count: 901 },
  { publication_year: 2015, venue: 'PLoS ONE', paper_count: 6543 },
  { publication_year: 2015, venue: 'Scientific Reports', paper_count: 2471 },
  { publication_year: 2015, venue: 'arXiv.org', paper_count: 1833 },
  { publication_year: 2015, venue: 'Radiopaedia.org', paper_count: 1151 },
  { publication_year: 2015, venue: 'British medical journal', paper_count: 979 },
  { publication_year: 2016, venue: 'PLoS ONE', paper_count: 5036 },
  { publication_year: 2016, venue: 'Scientific Reports', paper_count: 4550 },
  { publication_year: 2016, venue: 'arXiv.org', paper_count: 2088 },
  { publication_year: 2016, venue: 'OncoTarget', paper_count: 1621 },
  { publication_year: 2016, venue: 'Radiopaedia.org', paper_count: 1007 },
  { publication_year: 2017, venue: 'Scientific Reports', paper_count: 9443 },
  { publication_year: 2017, venue: 'PLoS ONE', paper_count: 4607 },
  { publication_year: 2017, venue: 'arXiv.org', paper_count: 2589 },
  { publication_year: 2017, venue: 'OncoTarget', paper_count: 2327 },
  { publication_year: 2017, venue: 'bioRxiv', paper_count: 2216 },
  { publication_year: 2018, venue: 'Scientific Reports', paper_count: 7995 },
  { publication_year: 2018, venue: 'PLoS ONE', paper_count: 3997 },
  { publication_year: 2018, venue: 'bioRxiv', paper_count: 3836 },
  { publication_year: 2018, venue: 'The IUCN Red List of Threatened Species', paper_count: 3739 },
  { publication_year: 2018, venue: 'arXiv.org', paper_count: 3275 },
  { publication_year: 2019, venue: 'Scientific Reports', paper_count: 6893 },
  { publication_year: 2019, venue: 'Case Medical Research', paper_count: 6396 },
  { publication_year: 2019, venue: 'Journal of Physics: Conference Series', paper_count: 5417 },
  { publication_year: 2019, venue: 'bioRxiv', paper_count: 5331 },
  { publication_year: 2019, venue: 'IOP Conference Series: Materials Science and Engineering', paper_count: 4517 },
  { publication_year: 2020, venue: 'Definitions', paper_count: 19224 },
  { publication_year: 2020, venue: 'ENCODE Datasets', paper_count: 9215 },
  { publication_year: 2020, venue: 'Scientific Reports', paper_count: 7225 },
  { publication_year: 2020, venue: 'bioRxiv', paper_count: 7078 },
  { publication_year: 2020, venue: 'arXiv.org', paper_count: 5755 },
  { publication_year: 2021, venue: 'bioRxiv', paper_count: 6890 },
  { publication_year: 2021, venue: 'Scientific Reports', paper_count: 5902 },
  { publication_year: 2021, venue: 'arXiv.org', paper_count: 5031 },
  { publication_year: 2021, venue: 'Reactions weekly', paper_count: 4238 },
  { publication_year: 2021, venue: 'PLoS ONE', paper_count: 3291 },
  { publication_year: 2022, venue: 'CABI Compendium', paper_count: 16765 },
  { publication_year: 2022, venue: 'bioRxiv', paper_count: 7288 },
  { publication_year: 2022, venue: 'arXiv.org', paper_count: 6975 },
  { publication_year: 2022, venue: 'Scientific Reports', paper_count: 5242 },
  { publication_year: 2022, venue: 'Reactions weekly', paper_count: 4580 },
  { publication_year: 2023, venue: 'arXiv.org', paper_count: 9230 },
  { publication_year: 2023, venue: 'bioRxiv', paper_count: 5661 },
  { publication_year: 2023, venue: 'Social Science Research Network', paper_count: 3859 },
  { publication_year: 2023, venue: 'Reactions weekly', paper_count: 3237 },
  { publication_year: 2023, venue: 'Scientific Reports', paper_count: 2739 },
];
const PublicationAreaChart: React.FC<PublicationAreaChartProps> = ({ publicationData }) => {
  // Step 1: Calculate total publications per venue
  const venueTotal: Record<string, number> = publicationData.reduce((acc: Record<string, number>, curr) => {
    acc[curr.venue] = (acc[curr.venue] || 0) + curr.paper_count;
    return acc;
  }, {});

  // Step 2: Identify top 5 venues
  const top5Venues = Object.entries(venueTotal)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((entry) => entry[0]);

  // Step 3: Pivot data to wide format and handle missing venues
  const wideData: WidePublicationData[] = [];

  publicationData.forEach((record) => {
    if (top5Venues.includes(record.venue)) {
      let yearEntry = wideData.find((entry) => entry.publication_year === record.publication_year);
      if (!yearEntry) {
        yearEntry = { publication_year: record.publication_year };
        // Initialize all top5Venues with 0
        top5Venues.forEach((venue) => {
          yearEntry![venue] = 0;
        });
        wideData.push(yearEntry);
      }
      yearEntry[record.venue] = (yearEntry[record.venue] || 0) + record.paper_count;
    }
  });

  // Sort the data by publication_year
  const data = wideData.sort((a, b) => a.publication_year - b.publication_year);

  // Define colors for the top 5 venues
  const COLORS = ['#008FFB', '#00E396', '#CED4DC', '#FF4560', '#FEB019'];

  // State to track active (visible) venues
  const [activeVenues, setActiveVenues] = useState<string[]>(top5Venues);

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
    data: data.map((entry) => ({
      x: new Date(entry.publication_year, 0, 1).getTime(), // Using January 1st of the publication year
      y: activeVenues.includes(venue) ? entry[venue] : 0,
    })),
  }));

  // ApexCharts options
  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      stacked: true,
    },
    colors: COLORS,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'monotoneCubic',
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
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </CardContent>
    </Card>
  );
};

// Export the component with sample data for demonstration
const PublicationAreaChartWithSampleData: React.FC = () => {
  return <PublicationAreaChart publicationData={PUBLICATIONDATA} />;
};

export default PublicationAreaChartWithSampleData;

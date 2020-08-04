import React, { useMemo } from 'react';
import { Chart } from 'react-charts';

const LineChart = (props) => {
  const data = useMemo(
    () => [
      {
        data: props.data,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const series = useMemo(
    () => ({
      type: 'area',
    }),
    []
  );

  const axes = useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  );
  return <Chart data={data} axes={axes} series={series} />;
};

export default LineChart;

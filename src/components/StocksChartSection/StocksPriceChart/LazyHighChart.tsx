import React from 'react';
import Loading from '@/lib/components/Loading.tsx';
import type { HighchartsReactProps } from 'highcharts-react-official';

const LazyHighcharts = React.lazy(async () => {
  const Highcharts = await import('highcharts');
  const HighchartsReact = (await import('highcharts-react-official')).default;
  const highchartsAccessibility = (
    await import('highcharts/modules/accessibility')
  ).default;

  highchartsAccessibility(Highcharts);

  return {
    default: (props: HighchartsReactProps) => (
      <HighchartsReact highcharts={Highcharts} {...props} />
    ),
  };
});

type LazyHighchartsProps = HighchartsReactProps;

const LazyHighchartsWrapper: React.FC<LazyHighchartsProps> = (props) => (
  <React.Suspense fallback={<Loading />}>
    <LazyHighcharts {...props} />
  </React.Suspense>
);

export default LazyHighchartsWrapper;

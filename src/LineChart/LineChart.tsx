import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDerivedValue, type SharedValue } from 'react-native-reanimated';

import {
  Circle,
  LinearGradient,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import { Text as SKText } from '@shopify/react-native-skia';

import { Area, CartesianChart, Line, useChartPressState } from 'victory-native';

import { DATA } from '../utils/data';

const roboto = require('../../roboto.ttf');

const ToolTip = ({
  x,
  y,
}: {
  x: SharedValue<number>;
  y: SharedValue<number>;
}) => {
  return <Circle r={8} cx={x} cy={y} color={'#d6e957'} opacity={0.8} />;
};

export const LineChart = () => {
  const font = useFont(roboto, 12);
  const chartFont = useFont(roboto, 30);

  const labelColor = '#fff';
  const lineColor = '#d6e957';
  const [chartData, setChartData] = useState(DATA);

  const { state, isActive } = useChartPressState({ x: 0, y: { hightTmp: 0 } });

  const value = useDerivedValue(() => {
    return `R$ ${state.y.hightTmp.value.value.toFixed(2)}`;
  }, [state]);

  return (
    <>
      <View style={styles.container}>
        <CartesianChart
          data={DATA}
          xKey={'day'}
          yKeys={['hightTmp']}
          domainPadding={{ top: 30 }}
          axisOptions={{
            font,
            labelColor,
            // lineColor: '#ccc',
          }}
          chartPressState={state}
        >
          {({ points, chartBounds }) => {
            return (
              <>
                <SKText
                  x={chartBounds.left + 10}
                  y={40}
                  font={chartFont}
                  text={value}
                  color={labelColor}
                  style={'fill'}
                />
                <Line
                  points={points.hightTmp}
                  color={lineColor}
                  strokeWidth={3}
                  animate={{ type: 'timing', duration: 500 }}
                />
                <Area
                  points={points.hightTmp}
                  y0={chartBounds.bottom}
                  animate={{ type: 'timing', duration: 500 }}
                  opacity={0.7}
                >
                  <LinearGradient
                    start={vec(chartBounds.bottom, 100)}
                    end={vec(chartBounds.bottom, chartBounds.bottom)}
                    colors={[lineColor, '#1f1f1f']}
                  />
                </Area>
                {isActive ? (
                  <ToolTip x={state.x.position} y={state.y.hightTmp.position} />
                ) : null}
              </>
            );
          }}
        </CartesianChart>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: '60%',
    // backgroundColor: '#2b2b2b',
  },
});

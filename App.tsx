import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from './src/LineChart/LineChart';

export default function App() {
  return (
    <View style={styles.container}>
      <LineChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1b1b',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  text: {
    color: '#fff',
  },
});

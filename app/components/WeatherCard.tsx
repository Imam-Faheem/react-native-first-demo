import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Dimensions } from 'react-native';

interface WeatherCardProps {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;  // Current temperature in Celsius
    condition: { text: string; icon: string };
    feelslike_c: number;  // Feels like temperature in Celsius
    wind_kph: number;  // Wind speed in kilometers per hour
    humidity: number;  // Humidity percentage
    uv: number;  // UV index
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ location, current }) => {
  const screenWidth = Dimensions.get('window').width;
  const { name, region, country } = location;
  const { temp_c, condition, feelslike_c, wind_kph, humidity, uv } = current;

  const data = {
    labels: ["Temp (°C)", "Feels Like (°C)", "Wind (kph)", "Humidity (%)", "UV Index"],
    datasets: [
      {
        data: [temp_c, feelslike_c, wind_kph, humidity, uv],
        color: (opacity = 1) => `rgba(34, 128, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <Animated.View
      style={styles.card}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Text style={styles.title}>{`${name}, ${region}, ${country}`}</Text>
      <Text style={styles.conditionText}>{condition.text}</Text>
      
      <View style={styles.row}>
        <Image
          source={{ uri: `https:${condition.icon}` }}
          style={styles.icon}
        />
        <Text style={styles.temperature}>{temp_c}°C</Text>
      </View>

      <LineChart
        data={data}
        width={screenWidth * 0.9}
        height={180}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#f7f7f7',
          backgroundGradientTo: '#f7f7f7',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(34, 128, 235, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 10 },
          propsForDots: { r: '5', strokeWidth: '2', stroke: '#00bfff' },
        }}
        bezier
        style={styles.chart}
      />

      <View style={styles.details}>
        <Text style={styles.detailText}>Feels like: {feelslike_c}°C</Text>
        <Text style={styles.detailText}>Wind: {wind_kph} kph</Text>
        <Text style={styles.detailText}>Humidity: {humidity}%</Text>
        <Text style={styles.detailText}>UV Index: {uv}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  conditionText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00bfff',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 10,
  },
  details: {
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

export default WeatherCard;

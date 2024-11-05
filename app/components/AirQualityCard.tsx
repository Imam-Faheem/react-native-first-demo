import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AirQualityCardProps {
  aqi: number;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({ aqi }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Air Quality Index</Text>
      <Text style={styles.aqi}>{aqi}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  aqi: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6347',
  },
});

export default AirQualityCard;

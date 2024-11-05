import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ForecastCardProps {
  date: string;
  temperature: number;
  condition: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ date, temperature, condition }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.temperature}>{temperature} °C</Text>
      <Text style={styles.condition}>{condition}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    margin: 5,
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 14,
    color: '#333',
  },
});

export default ForecastCard;

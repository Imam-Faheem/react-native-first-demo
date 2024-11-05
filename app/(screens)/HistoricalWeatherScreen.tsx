import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { fetchHistoricalWeather } from '../utils/weatherAPI';
import { HistoricalData } from '../utils/types';
import HistoricalCard from '../components/HistoricalCard';
import { Ionicons } from '@expo/vector-icons';
import { useSnackbar } from '@/context/SnackbarContext';

const HistoricalWeatherScreen = () => {
  const [city, setCity] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
  const { showSnackbar } = useSnackbar();

  const fetchHistoricalData = async () => {
    if (!city.trim()) {
      showSnackbar('Please enter a city name.'); 
      return;
    }
    if (!city) {
      showSnackbar("Please enter a city.");
      return;
    }

    if (!date) {
      showSnackbar("Please enter a date (YYYY-MM-DD).");
      return;
    }

    const currentDate = new Date();
    const inputDate = new Date(date);
    if (inputDate > currentDate) {
      showSnackbar("The date cannot be in the future.");
      return;
    }

    try {
      const { historicalWeather, errormessage } = await fetchHistoricalWeather(city, date);
      if (errormessage || !historicalWeather) {
        showSnackbar(errormessage || "No historical data available for this date.");
        return;
      }

      setHistoricalData(historicalWeather);
    } catch (error) {
      showSnackbar("Failed to fetch historical weather data. Please try again.");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="calendar-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchHistoricalData}>
        <Text style={styles.buttonText}>Get Historical Weather</Text>
      </TouchableOpacity>
      {historicalData && (
        <HistoricalCard historicalData={historicalData} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft:10,
    color: '#333',
  },
  button: {
    backgroundColor: '#FFA726',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoricalWeatherScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { fetchForecast } from '../utils/weatherAPI';
import ForecastCard from '../components/ForecastCard';
import { useSnackbar } from '@/context/SnackbarContext'; // Adjust the path as needed
import { Ionicons } from '@expo/vector-icons';
import { Forecast } from '../utils/types';

const ForecastScreen = () => {
  const [city, setCity] = useState(''); // State to hold the input city
  const [forecastData, setForecastData] = useState<Forecast | null>(null); // Update state to use Forecast type
  const { showSnackbar } = useSnackbar(); // Access snackbar context

  const fetchForecastData = async () => {
    if (!city) {
      showSnackbar('Please enter a city name.');
      return;
    }
    try {
      const { forecast, errormessage } = await fetchForecast(city);
      if (errormessage || !forecast) {
        showSnackbar(errormessage || 'No forecast data available.');
        return;
      }
      setForecastData(forecast);
    } catch (error) {
      showSnackbar('Failed to fetch forecast data. Please try again.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Get Weather Forecast</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchForecastData}>
        <Text style={styles.buttonText}>Get Forecast</Text>
      </TouchableOpacity>

      {forecastData && 
        <ForecastCard
          location={forecastData.location}
          current={forecastData.current} 
          forecast={forecastData.forecast} 
        />
      }
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    color: '#333',
    paddingLeft: 10,
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

export default ForecastScreen;

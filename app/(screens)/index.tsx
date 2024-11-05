import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { getCurrentLocationWeather, fetchAirQuality } from '../utils/weatherAPI';
import WeatherCard from '../components/WeatherCard';
import AirQualityCard from '../components/AirQualityCard';
import NotFoundScreen from '../components/NotFoundScreen';
import { useSnackbar } from '@/context/SnackbarContext'; // Adjust the path as needed
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [airQuality, setAirQuality] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      showSnackbar('Please enter a city name.'); 
      return;
    }
    setNotFound(false); 
    try {
      const { weather, errormessage } = await getCurrentLocationWeather(city);
      
      if (errormessage || !weather) {
        showSnackbar(errormessage || 'City not found.');
        setNotFound(true);
        return;
      }

      setWeatherData(weather);
      setErrorMessage(null);

      const airQualityData = await fetchAirQuality(city);
      if (!airQualityData) {
        showSnackbar('Failed to fetch air quality data.');
        setNotFound(true);
        return;
      }

      setAirQuality(airQualityData);
      
    } catch (error) {
      showSnackbar('Failed to fetch weather data. Please try again.');
      console.error(error);
      setNotFound(true);
    }
  };

  const handleTryAgain = () => {
    setCity('');
    setWeatherData(null);
    setAirQuality(null);
    setNotFound(false);
  };

  if (notFound) {
    return <NotFoundScreen onTryAgain={handleTryAgain} />;
  }

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
      <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {weatherData && (
        <>
          <WeatherCard
            location={weatherData?.location}
            current={weatherData?.current}
          />
          {airQuality && (
            <AirQualityCard aqi={airQuality['us-epa-index']} />
          )}
        </>
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
    color: '#333',
    paddingLeft:10
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

export default HomeScreen;

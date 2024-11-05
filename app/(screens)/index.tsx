import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getCurrentLocationWeather, fetchAirQuality } from '../utils/weatherAPI';
import WeatherCard from '../components/WeatherCard';
import AirQualityCard from '../components/AirQualityCard';
import NotFoundScreen from '../components/NotFoundScreen';
import { useSnackbar } from '@/context/SnackbarContext'; // Adjust the path as needed

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [airQuality, setAirQuality] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    setNotFound(false); // Reset not found state on new fetch
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={fetchWeatherData} />

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    padding: 10,
    marginBottom: 20,
  },
});

export default HomeScreen;

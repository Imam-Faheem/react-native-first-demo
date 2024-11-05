import axios from 'axios';

const API_KEY = 'f5b9785fc1e9422f91b151405240511';
const BASE_URL = 'http://api.weatherapi.com/v1';

// Function to get current weather for a city
export const getCurrentLocationWeather = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`);
    console.log("🚀 ~ getCurrentLocationWeather ~ response:", response.data);
    return { weather: response.data, errormessage: null };
  } catch (error:any) {
    console.error("Error fetching current weather data:", error);
    const errormessage = error.response?.data?.error?.message || "Failed to fetch current weather data.";
    return { weather: null, errormessage };
  }
};

// Function to fetch weather forecast for a location
export const fetchForecast = async (location: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7&alerts=yes&aqi=yes`);
    console.log("🚀 ~ fetchForecast ~ response:", response.data);
    return { forecast: response.data, errormessage: null };
  } catch (error:any) {
    console.error("Error fetching weather forecast:", error);
    const errormessage = error.response?.data?.error?.message || "Failed to fetch weather forecast.";
    return { forecast: null, errormessage };
  }
};

// Function to fetch historical weather for a specific date
export const fetchHistoricalWeather = async (location: string, date: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/history.json?key=${API_KEY}&q=${location}&dt=${date}`);
    console.log("🚀 ~ fetchHistoricalWeather ~ response:", response.data);
    return { historicalWeather: response.data, errormessage: null };
  } catch (error:any) {
    console.error("Error fetching historical weather:", error);
    const errormessage = error.response?.data?.error?.message || "Failed to fetch historical weather.";
    return { historicalWeather: null, errormessage };
  }
};

// Function to fetch air quality for a location
export const fetchAirQuality = async (location: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=yes`);
    return { airQuality: response.data.current.air_quality, errormessage: null };
  } catch (error:any) {
    console.error("Error fetching air quality:", error);
    const errormessage = error.response?.data?.error?.message || "Failed to fetch air quality.";
    return { airQuality: null, errormessage };
  }
};

// /app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { SnackbarProvider } from '@/context/SnackbarContext'; // Adjust the import path as needed
import Header from './components/Header';

const Layout = () => {
  return (
    <SnackbarProvider>
    <Header/>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ title: 'Home'}} 
        />
        <Stack.Screen 
          name="ForecastScreen" 
          options={{ title: 'Weather Forecast'}} 
        />
        <Stack.Screen 
          name="HistoricalWeatherScreen" 
          options={{ title: 'Historical Weather'}} 
        />
      </Stack>
    </SnackbarProvider>
  );
};

export default Layout;

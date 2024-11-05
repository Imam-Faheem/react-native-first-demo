export interface WeatherLocation {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
  }
  
  export interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
  }
  
  export interface CurrentWeather {
    temp_c: number;
    feelslike_c: number;
    condition: WeatherCondition;
    humidity: number;
    wind_kph: number;
    precip_mm: number;
    pressure_mb: number;
  }
  
  export interface WeatherData {
    location: WeatherLocation;
    current: CurrentWeather;
  }
  
  export interface AirQualityData {
    "us-epa-index": number;
    pm2_5: number;
    pm10: number;
    o3: number;
    no2: number;
    co: number;
  }
  
  export interface HistoricalWeatherData {
    forecast: {
      forecastday: Array<{
        date: string;
        day: {
          avgtemp_c: number;
          condition: WeatherCondition;
        };
      }>;
    };
  }
  
  export interface ForecastData {
    forecast: {
      forecastday: Array<{
        date: string;
        day: {
          avgtemp_c: number;
          condition: WeatherCondition;
        };
      }>;
    };
  }

  
export interface HistoricalData {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime: string;
    };
    forecast: {
        forecastday: Array<{
            date: string;
            day: {
                maxtemp_c: number;
                mintemp_c: number;
                avgtemp_c: number;
                condition: {
                    text: string;
                };
                avghumidity: number;
            };
            astro: {
                sunrise: string;
                sunset: string;
            };
            hour: Array<{
                time_epoch: number;
                time: string;
                temp_c: number;
                condition: {
                    text: string;
                };
                wind_mph: number;
                humidity: number;
            }>;
        }>;
    };
}
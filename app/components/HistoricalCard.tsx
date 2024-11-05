import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit'; // Importing both LineChart and BarChart
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { HistoricalData } from '../utils/types';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window'); // Get the width of the device screen

const HistoricalCard: React.FC<{ historicalData: HistoricalData }> = ({ historicalData }) => {
    const { location, forecast } = historicalData;
    const { name, region, country, lat, lon, tz_id, localtime } = location;
    const forecastDay = forecast.forecastday[0];

    // Preparing data for the charts
    const hourlyTemps = forecastDay.hour.map(hourData => hourData.temp_c);
    const hourlyLabels = forecastDay.hour.map(hourData => hourData.time);
    const hourlyHumidity = forecastDay.hour.map(hourData => hourData.humidity); // Adding humidity for the bar chart

    // Define chart dimensions
    const chartWidth = width - 40; // Subtract padding to ensure it fits well
    const chartHeight = 220; // You can adjust this height as needed

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.locationContainer}>
                <Text style={styles.title}>Location Details</Text>
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Name: {name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="globe-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Region: {region}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="flag-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Country: {country}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="list-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Latitude: {lat}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="cloud-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Longitude: {lon}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="time-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Timezone: {tz_id}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="time-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Local Time: {localtime}</Text>
                </View>
            </Animated.View>

            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.forecastContainer}>
                <Text style={styles.title}>Forecast for {forecastDay.date}</Text>
                <View style={styles.infoRow}>
                    <Ionicons name="thermometer-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Max Temp: {forecastDay.day.maxtemp_c}°C</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="thermometer-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Min Temp: {forecastDay.day.mintemp_c}°C</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="thermometer-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Avg Temp: {forecastDay.day.avgtemp_c}°C</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="cloud-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Condition: {forecastDay.day.condition.text}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="water-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Humidity: {forecastDay.day.avghumidity}%</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="rose-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Sunrise: {forecastDay.astro.sunrise}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="bus-outline" size={20} color="#FFA726" />
                    <Text style={styles.infoText}>Sunset: {forecastDay.astro.sunset}</Text>
                </View>
            </Animated.View>

            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.chartContainer}>
                <Text style={styles.title}>Hourly Temperature Chart</Text>
                <LineChart
                    data={{
                        labels: hourlyLabels,
                        datasets: [
                            {
                                data: hourlyTemps,
                            },
                        ],
                    }}
                    width={chartWidth} // Use the dynamic width
                    height={chartHeight} // Use the defined height
                    yAxisLabel=""
                    yAxisSuffix="°C"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 2, // optional, defaults to 2
                        color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // orange color
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black color
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726",
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </Animated.View>

            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.chartContainer}>
                <Text style={styles.title}>Hourly Humidity Chart</Text>
                <BarChart
                    data={{
                        labels: hourlyLabels,
                        datasets: [
                            {
                                data: hourlyHumidity,
                            },
                        ],
                    }}
                    width={chartWidth} // Use the dynamic width
                    height={chartHeight} // Use the defined height
                    yAxisLabel=""
                    yAxisSuffix="%"
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0, // optional, defaults to 0
                        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // blue color for humidity
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black color
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </Animated.View>

            <View style={styles.hourlyForecastContainer}>
                <Text style={styles.title}>Hourly Forecast</Text>
                {forecastDay.hour.map((hourData) => (
                    <View key={hourData.time_epoch} style={styles.hourContainer}>
                        <Text>Time: {hourData.time}</Text>
                        <Text>Temperature: {hourData.temp_c}°C</Text>
                        <Text>Condition: {hourData.condition.text}</Text>
                        <Text>Wind Speed: {hourData.wind_mph} mph</Text>
                        <Text>Humidity: {hourData.humidity}%</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    locationContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 1,
    },
    forecastContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 1,
    },
    chartContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 1,
    },
    hourlyForecastContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 1,
    },
    hourContainer: {
        marginBottom: 10,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#555',
    },
});

export default HistoricalCard;

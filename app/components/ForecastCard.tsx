import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Animated from 'react-native-reanimated';
import { Forecast } from '../utils/types';

const ForecastCard: React.FC<Forecast> = ({ location, current, forecast }) => {
    const forecastDays = forecast?.forecastday || [];
    const chartData = forecastDays.map(day => day.day.avgtemp_c);

    return (
        <ScrollView contentContainerStyle={styles.card}>
            <Animated.View style={styles.locationContainer}>
                <Text style={styles.title}>Location Details</Text>
                {/* Info Rows */}
                {Object.entries(location).map(([key, value]) => (
                    <View style={styles.infoRow} key={key}>
                        <Ionicons name="location-outline" size={20} color="#FFA726" />
                        <Text style={styles.infoText}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</Text>
                    </View>
                ))}
            </Animated.View>

            <Text style={styles.date}>{new Date(location.localtime).toLocaleDateString()}</Text>
            <Text style={styles.temperature}>{current.temperature} °C</Text>
            <Text style={styles.condition}>{current.condition.text}</Text>

            {/* Advanced Chart Section */}
            <LineChart
                data={{
                    labels: forecastDays.map(day => day.date),
                    datasets: [
                        {
                            data: chartData,
                            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                            strokeWidth: 3,
                        },
                    ],
                }}
                width={Dimensions.get('window').width} // Use full width
                height={220}
                yAxisLabel=""
                yAxisSuffix="°C"
                withDots={true}
                withInnerLines={true}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#FFA726',
                    },
                    propsForLabels: {
                        fontSize: 12,
                    },
                }}
                style={styles.chart}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
        marginVertical: 10,
        alignItems: 'center',
        width: '100%', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    infoText: {
        marginLeft: 5,
        color: '#333',
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    temperature: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFA726',
    },
    condition: {
        fontSize: 16,
        color: '#666',
    },
    chart: {
        marginVertical: 10,
        borderRadius: 16,
    },
    locationContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 1,
    },

});

export default ForecastCard;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Link, usePathname } from 'expo-router'; // Import usePathname from expo-router

const Header = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const pathname = usePathname(); // Get the current pathname

  // Effect to set the active tab based on the current URL
  useEffect(() => {
    if (pathname === '/') {
      setActiveTab('Home');
    } else if (pathname === '/ForecastScreen') {
      setActiveTab('Forecast');
    } else if (pathname === '/HistoricalWeatherScreen') {
      setActiveTab('Historic');
    }
  }, [pathname]); // Depend on pathname to update the active tab

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Animated.View style={styles.header} entering={FadeIn}>
      <Image 
        source={require('../../assets/images/logo.png')} // Adjust the path to your logo image
        style={styles.logo}
      />
      <View style={styles.tabs}>
        <Link href="/" asChild>
          <TouchableOpacity onPress={() => handleTabPress('Home')}>
            <Text style={[styles.tabText, activeTab === 'Home' && styles.activeTab]}>
              Home
            </Text>
          </TouchableOpacity>
        </Link>
        <Link href="/ForecastScreen" asChild>
          <TouchableOpacity onPress={() => handleTabPress('Forecast')}>
            <Text style={[styles.tabText, activeTab === 'Forecast' && styles.activeTab]}>
              Forecast
            </Text>
          </TouchableOpacity>
        </Link>
        <Link href="/HistoricalWeatherScreen" asChild>
          <TouchableOpacity onPress={() => handleTabPress('Historic')}>
            <Text style={[styles.tabText, activeTab === 'Historic' && styles.activeTab]}>
              Historic
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,  // Android shadow
    width: "100%"
  },
  logo: {
    width: 70,  // Adjust logo size
    height: 70, // Adjust logo size
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
  },
  activeTab: {
    color: '#007BFF',  // Color for active tab
    fontWeight: 'bold', // Bold font for active tab
    borderBottomWidth: 2,
    borderColor: '#007BFF', // Border color for active tab
  },
});

export default Header;

// This header component features a logo and tabs for navigation
// Each tab updates the active state to visually differentiate.

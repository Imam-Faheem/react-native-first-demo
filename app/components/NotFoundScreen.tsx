// NotFoundScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const NotFoundScreen = ({ onTryAgain }: { onTryAgain: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>City Not Found</Text>
      <Text style={styles.message}>We couldn't find the weather information for the city you entered. Please try again.</Text>
      <Button title="Try Again" onPress={onTryAgain} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default NotFoundScreen;

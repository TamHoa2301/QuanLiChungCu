import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Hello = ({ navigation }) => {
  const handleStart = () => {
    // Navigate to your main screen or do any other action
    navigation.navigate('Login'); // Replace 'MainScreen' with your screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng đến với ứng dụng của chúng tôi!</Text>
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Bắt đầu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Hello;
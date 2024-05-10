import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import Login from './Login'; // Đây là component đăng nhập của bạn
import Home from './Home'; // Đây là component trang Home của bạn
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator   } from '@react-navigation/stack';

const Stack = createStackNavigator ();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
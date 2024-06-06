import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-paper';
import Login from './components/User/Login';
import HomeUser from './components/User/HomeUser';
import ListUngDung from './components/User/ListUngDung';
// import Register from './components/User/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from './components/User/UserProfile';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} options={{ title: 'Dang Nhap' }} />
      <Stack.Screen name='UserProfile' component={UserProfile} options={{ title: 'Thong tin khach hang' }} />
      <Stack.Screen name='HomeUser' component={HomeUser} options={{ title: 'Trang chu' }} />
      <Stack.Screen name='List' component={ListUngDung} options={{ title: 'Danh sach chuc nang' }} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const MyTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={MyStack} options={{ title: "Ứng dụng", tabBarIcon: () => <Icon color='blue' size={30} source="home" /> }} />
      <Tab.Screen name='Login' component={Login} options={{ title: "Đăng nhập", tabBarIcon: () => <Icon color='blue' size={30} source="login" /> }} />
      <Tab.Screen name='UserProfile' component={UserProfile} options={{ title: "Profile", tabBarIcon: () => <Icon color='blue' size={30} source="login" /> }} />
      <Tab.Screen name='Chucnang' component={ListUngDung} options={{ title: "ChucNang", tabBarIcon: () => <Icon color='blue' size={30} source="listungdung" /> }} />
    </Tab.Navigator>
  );
}


export default function App() {
  // const [user, dispatcher] = useReducer(MyUserReducer, null);
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
}
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  address: '123 Main St, Springfield, USA',
  profilePicture: 'https://via.placeholder.com/150', // Replace with a real image URL
};

const UserProfile = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>
      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>{user.phone}</Text>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.value}>{user.address}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
});
export default UserProfile
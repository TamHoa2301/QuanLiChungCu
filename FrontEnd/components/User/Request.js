import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Request = () => {
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user');
        if (storedUserId !== null) {
          setUserId(storedUserId); // set userId from AsyncStorage
          console.log('User ID loaded successfully:', storedUserId);
        } else {
          console.log('User ID not found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error loading user ID:', error);
      }
    };

    fetchUserId(); // Call fetchUserId when component is mounted
  }, []);


  const handleSubmit = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('user');
      const userId = JSON.parse(storedUserId);
      console.log(userId.id)
      let formData = new FormData();
      formData.append('userId', userId);
      formData.append('title', title);
      formData.append('content', content);
      
      const response = await axios.post(`https://tuantunguyenq23.pythonanywhere.com/users/${userId.id}/card-request/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Repost submitted successfully:', response.data);
      Alert.alert('Success', 'Repost submitted successfully!');
      // Reset form fields if needed
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error submitting repost:', error);
      Alert.alert('Error', 'Failed to submit repost. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        autoCapitalize="sentences"
      />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={content}
        onChangeText={setContent}
        placeholder="Enter content"
        multiline
        numberOfLines={4}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333', // Màu chữ thêm vào để nổi bật
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 5,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top', // Hiển thị văn bản từ đầu dòng
  },
});


export default Request;
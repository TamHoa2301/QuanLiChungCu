import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportList = () => {
    const [userId, setUserId] = useState(null);
    const [reports, setReports] = useState([]);
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
    
    
      useEffect(() => {
        const fetchReports= async () => {
          setLoading(true);
          try {
            const storedUserId = await AsyncStorage.getItem('user');
            const userId = JSON.parse(storedUserId);
            console.log(userId.id);
            const response = await axios.get(`https://tuantunguyenq23.pythonanywhere.com/users/${userId.id}/get-reports/`);
            console.log('API Response:', response.data);  // Kiểm tra dữ liệu từ API
            setReports(response.data);
            setError('');
          } catch (error) {
            console.error('Error fetching items:', error);
            setError('Error fetching items');
          } finally {
            setLoading(false);
          }
        };
        fetchReports();
      }, []);

    const renderItem = ({ item }) => {
        console.log('Rendering item:', item); // Kiểm tra từng phần tử
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{item.title || 'No title'}</Text>
                <Text style={styles.content}>{item.content || 'No content'}</Text>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={reports}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    content: {
        fontSize: 16,
    },
});

export default ReportList;
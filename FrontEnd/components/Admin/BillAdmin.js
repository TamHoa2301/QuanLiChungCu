import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

const BillAdmin = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user');
        if (storedUserId !== null) {
          setUserId(JSON.parse(storedUserId));
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
    const fetchItems = async () => {
      setLoading(true);
      try {
        const storedUserId = await AsyncStorage.getItem('user');
        const userId = JSON.parse(storedUserId);
        console.log(userId.id)
        const response = await axios.get(`https://tuantunguyenq23.pythonanywhere.com/bills`);
        setBills(response.data);
        console.log(response.data)
        setError('');
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Error fetching items');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const goDetail = (billId) => {
    navigation.navigate('BillDetails', { billId });
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => goDetail(item.id)}>
      <View style={styles.infoContainer}>
        <Text style={styles.idText}>ID: {item.id}</Text>
        <Text style={styles.nameText}>Loại: {item.billType}</Text>
        <Text style={styles.nameText}>Total: {item.total}</Text>
        <Text style={styles.nameText}>User: {userId?.id}</Text>
        <Text style={styles.statusText}>Is Paid: {item.is_paid ? 'Yes' : 'No'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchButton}>
        <FontAwesome name="search" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Tìm kiếm..."
          style={styles.input}
        // value={searchQuery}
        // onChangeText={handleChangeText}
        />
      </View>
      <FlatList
        data={bills}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  idText: {
    fontWeight: 'bold',
  },
  nameText: {
    marginVertical: 2,
  },
  statusText: {
    color: 'gray',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default BillAdmin;
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, FlatList, Image, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

const Items = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user');
        if (storedUserId !== null) {
          setUserId(storedUserId);
          console.log('User ID loaded successfully:', storedUserId);
        } else {
          console.log('User ID not found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error loading user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('access-token'); // Get the token from AsyncStorage
        if (token) {
          const response = await axios.get('https://tuantunguyenq23.pythonanywhere.com/items/', {
            headers: {
              'Authorization': `Bearer ${token}` // Include the token in the request headers
            }
          });
          setItems(response.data);
          console.log(response.data);
          setError('');
        } else {
          setError('Token not found');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Error fetching items');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const changeItemState = async (itemId) => {
    try {
      const token = await AsyncStorage.getItem('access-token'); // Get the token from AsyncStorage
      console.log(token);
      console.log(itemId);
      if (token) {
        const response = await axios.post(`https://tuantunguyenq23.pythonanywhere.com/items/${itemId}/change_state/`, {}, {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the request headers
          }
        });
        // Update the item state locally
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === itemId ? { ...item, isEmpty: response.data.isEmpty } : item
          )
        );
        console.log('Item state changed successfully:', response.data);
      } else {
        setError('Token not found');
      }
    } catch (error) {
      console.error('Error changing item state:', error);
      setError('Error changing item state');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.idText}>ID: {item.id}</Text>
        <Text style={styles.nameText}>Name: {item.name}</Text>
        <Text style={styles.statusText}>Is Receive: {item.isReceive ? 'Yes' : 'No'}</Text>
        <Button
          title={item.isReceive ? 'Đã nhận' : 'Nhận hàng'}
          onPress={() => changeItemState(item.id)}
        />
      </View>
    </View>
  );

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (items == null) {
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
        />
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    justifyContent: 'center',
    flex: 1,
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
  error: {
    color: 'red',
  },
});

export default Items;
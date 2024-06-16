import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { MyUserContext, MyDispatcherContext } from '../../configs/Contexts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';


const Storage = ({ navigation, route }) => {
  const [userId, setUserId] = useState(null);
  const [items, setItems] = useState([]);
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
    const fetchItems = async () => {
      setLoading(true);
      try {
        const storedUserId = await AsyncStorage.getItem('user');
        const userId = JSON.parse(storedUserId);
        console.log(userId.id)
        const response = await axios.get(`https://tuantunguyenq23.pythonanywhere.com/storages/`);
        setItems(response.data);
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

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.idText}>ID: {item.id}</Text>
        <Text style={styles.nameText}>Name: {item.name}</Text>
        <Text style={styles.statusText}>Is Empty: {item.isEmpty ? 'Yes' : 'No'}</Text>
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
        // value={searchQuery}
        // onChangeText={handleChangeText}
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
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
});
export default Storage;
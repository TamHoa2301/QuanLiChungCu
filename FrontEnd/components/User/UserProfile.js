import { View, Text, StyleSheet, Image, ScrollView, TextInput, Button } from 'react-native';
import React, { useContext, useReducer,useState, useEffect } from 'react';
import { MyUserContext, MyDispatcherContext } from '../../configs/Contexts';


const UserProfile = () => {
  const user = useContext(MyUserContext);
  const [users, setUsers] = useState([]);
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
 
  const updateUser = async (id, data) => {
    try {
      const response = await api.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };


  const handleUpdateUser = async () => {
    try {
      const updatedUser = {phone};
      await updateUser(userId, updatedUser);
      fetchUsers();
      setName('');
      setEmail('');
      setPhone('');
      setUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  return (
    <MyUserContext.Provider value={user}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri:'https://via.placeholder.com/150'}} style={styles.profilePicture} />
        <Text style={styles.name}>{user.username}</Text>
        <Text style={styles.label}>First_name:</Text>
        <Text style={styles.value}>{user.first_name}</Text>
        <Text style={styles.label}>Last_name:</Text>
        <Text style={styles.value}>{user.last_name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
        <Text style={styles.label}>SĐT:</Text>
        <TextInput style={styles.value} placeholder="0339022497" value={phone} onChangeText={setPhone}/>
        <Button title="Update" onPress={() => handleUpdateUser} />
      </ScrollView>
    </MyUserContext.Provider>
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
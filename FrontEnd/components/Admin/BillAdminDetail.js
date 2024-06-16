import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const BillAdminDetail = ({ route, navigation }) => {
  const { billId } = route.params;
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        console.log(billId);
        const response = await axios.get(`https://tuantunguyenq23.pythonanywhere.com/bills/${billId}/`);
        setBill(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching bill details:', error); 
        setError('Error fetching bill details');
      } finally {
        setLoading(false);
      }
    };

    fetchBillDetails();
  }, [billId]);

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

  if (!bill) {
    return (
      <View style={styles.container}>
        <Text>No bill details found.</Text>
      </View>
    );
  }

    return (
    <View style={styles.container}>
      <Text style={styles.title}>Bill Details</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{bill.id}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{bill.billType}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.value}>{bill.total}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Is Paid:</Text>
        <Text style={[styles.value, { color: bill.is_paid ? 'green' : 'red' }]}>
          {bill.is_paid ? 'Yes' : 'No'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 18,
    fontWeight: '400',
    color: '#333',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default BillAdminDetail;;
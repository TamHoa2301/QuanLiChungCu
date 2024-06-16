import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const Apartment = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [next, setNext] = useState(null);

    useEffect(() => {
        fetchData('https://tuantunguyenq23.pythonanywhere.com/apartments/');
    }, []);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(prevData => [...prevData, ...json.results]);
            setNext(json.next);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{item.apartmentName}</Title>
                <Paragraph>Location: {item.location}</Paragraph>
                <Paragraph>Status: {item.isFull ? 'Full' : 'Available'}</Paragraph>
            </Card.Content>
        </Card>
    );

    const loadMore = () => {
        if (next) {
            fetchData(next);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#6200ee" />
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
    },
});

export default Apartment;
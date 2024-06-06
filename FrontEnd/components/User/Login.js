import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Alert, ImageBackground, Dimensions } from "react-native";
import { Button, TextInput } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import React, { useContext, useState } from "react";
// import APIs, { authAPI, endpoints } from "../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const Login = () => {
    const navigation = useNavigation();
    const [user, setUser] = React.useState({});
    const fields = [{
        "label": "Tên đăng nhập",
        "icon": "account",
        "name": "username"
    }, {
        "label": "Mật khẩu",
        "icon": "eye",
        "secureTextEntry": true,
        "name": "password"
    }];
    const [loading, setLoading] = React.useState(false);

    // const login = async () => {
    //     setLoading(true);
    //     console.info(process.env.REACT_APP_CLIENT_ID)
    //     try {
    //         let res = await APIs.post(endpoints['login'], {
    //             ...user,
    //             'client_id': 'Vbe8euZZQJoWJ2UzW9wDThg4hJEZHHbhFmnfj7UR ',
    //             'client_secret': 'cVm4w4hSdy4MtwbP4KuNgXkGPeQJ9yrQdBvXHGR6b3e97F2bYqQ81XJ49FEufzjcw4SKwpuOZQiCLsNelHY1MkuYTGBRcSqtWmSlebSUk27WfyDskCB2VeCQihnEKdZ2',
    //             'grant_type': 'password'
    //         });

    //         AsyncStorage.setItem('access-token', res.data.access_token);

    //         setTimeout(async () => {
    //             let token = AsyncStorage.getItem('access-token');
    //             let user = await authAPI(token).get(endpoints['current-user']);
    //             AsyncStorage.setItem('user', user.data);
    //             console.info(user.data);

    //             dispatcher({
    //                 "type": login,
    //                 "payload": user.data
    //             });
    //         }, 100);

    //     } catch (ex) {
    //         console.error(ex);
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Kiểm tra tên người dùng và mật khẩu
        if (username === 'admin' && password === 'password') {
            Alert.alert('Login successful!');
            navigation.navigate('HomeUser')
        } else {
            Alert.alert('Invalid username or password. Please try again.');
        }
    };

    const { width, height } = Dimensions.get('window');

    const updateState = (field, value) => {
        setUser(current => {
            return { ...current, [field]: value }
        })
    }
    const handleRegister = ({ navigation }) => {
        navigation.navigate('Register');
    };
    const image = { uri: 'https://images.pexels.com/photos/17364664/pexels-photo-17364664/free-photo-of-nha-c-a-nha-ngoi-nha-can-nha.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' };

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <ScrollView>
                    <Button style={MyStyles.margin} loading={loading} icon="account" mode="contained" onPress={handleLogin} >
                        Đăng nhập
                    </Button>
                    <Button style={MyStyles.margin} loading={loading} icon="account" mode="contained" onPress={handleRegister}>
                        Đăng kí
                    </Button>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 40,
       paddingHorizontal: 10,
        justifyContent: 'center',
    },
});

export default Login;
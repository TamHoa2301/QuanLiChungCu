import { View, Text, ScrollView, KeyboardAvoidingView, Platform, ImageBackground, Alert} from "react-native";
import { Button,TextInput} from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import React, { useContext } from "react";
import APIs, { authAPI, endpoints } from "../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeUser from "./HomeUser";
import { MyDispatcherContext } from "../../configs/Contexts";
import { useNavigation } from "@react-navigation/native";


const Login = () => {
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
    const dispatch = useContext(MyDispatcherContext);
    const nav = useNavigation();

    const login = async () => {
        setLoading(true);

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
    
        try {
            // console.info(user)
            const res = await APIs.post(endpoints['login'], {
                ...user,
                'client_id': 'GhyRBLOvt8F79c05Mlv4OKLvTQH97nEjfyqZhX4u ',
                'client_secret': 'wpgLpz5WAE8YTGPXnu1FeYKMn7dGDPZ6932Vota4RyLYBTNRhLiiC8kc4gaZ8gifm1mZ8a7uwvPT73cHoqAo73lclllx48k4RKrYBuMvyiAMOuPezhLWoK2IznfbpMNV',
                'grant_type': 'password'
            }, {headers });

            AsyncStorage.setItem('access-token', res.data.access_token);
            setTimeout(async () => {
                let token = await AsyncStorage.getItem('access-token');
                let user = await authAPI(token).get(endpoints['current-user']);
                AsyncStorage.setItem('user', JSON.stringify(user.data));
                dispatch({
                    "type": "login",
                    "payload": user.data
                });
                Alert.alert('Đăng nhập thành công')
                nav.navigate('HomeUser');
            }, 100);

        } catch (ex) {
            Alert.alert("Sai tên tài khoản hay mật khẩu !")
        } finally {
            setLoading(false);
        }
    }

    const updateState = (field, value) => {
        setUser(current => {
            return { ...current, [field]: value }
        })
    }

    return (
        <View style={[MyStyles.container]}>
            <ImageBackground 
            source={{ uri: 'https://anhcuoiviet.vn/wp-content/uploads/2022/12/background-dep-cho-may-tinh-6-724x518.jpg' }} 
            style={MyStyles.image}
        >
        </ImageBackground>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    {fields.map(f => <TextInput value={user[f.name]} onChangeText={t => updateState(f.name, t)} key={f.label} style={MyStyles.margin} label={f.label} secureTextEntry={f.secureTextEntry} right={<TextInput.Icon icon={f.icon} />} />)}

                    <Button style={MyStyles.loginButton} loading={loading} icon="account" mode="contained" onPress={login}>
                        Đăng nhập
                    </Button>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

export default Login;
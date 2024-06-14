import { View, Text, Image, ScrollView, Platform, KeyboardAvoidingView, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Button, HelperText, TextInput, TouchableRipple } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import React from "react";
// import APIs, { endpoints } from "../../configs/APIs";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
    //     const [user, setUser] = React.useState({});
    //     const fields = [{
    //         "label": "Tên",
    //         "icon": "text",
    //         "name": "first_name"
    //     }, {
    //         "label": "Họ và tên lót",
    //         "icon": "text",
    //         "name": "last_name"
    //     }, {
    //         "label": "Tên đăng nhập",
    //         "icon": "account",
    //         "name": "username"
    //     }, {
    //         "label": "Mật khẩu",
    //         "icon": "eye",
    //         "secureTextEntry": true,
    //         "name": "password"
    //     },  {
    //         "label": "Xác nhận mật khẩu",
    //         "icon": "eye",
    //         "secureTextEntry": true,
    //         "name": "confirm"
    //     }];
    //     const [loading, setLoading] = React.useState(false);
    //     const [error, setError] = React.useState(false);
    //     const nav = useNavigation();

    //     const picker = async () => {
    //         let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //         if (status !== 'granted') {
    //             alert("Permissions denied!");
    //         } else {
    //             const result = await ImagePicker.launchImageLibraryAsync();
    //             if (!result.canceled)
    //                 setUser(current => {
    //                     return {...current, "avatar": result.assets[0]}
    //                 });
    //         }
    //     }

    //     const register = async () => {

    //         if (user?.password !== user?.confirm) {
    //             setError(true);
    //             return;
    //         } else
    //             setError(false);

    //         setLoading(true)
    //         try {
    //             let form = new FormData();
    //             for (let key in user)
    //                 if (key !== 'confirm')
    //                     if (key === 'avatar') {
    //                         form.append(key, {
    //                             uri: user.avatar.uri,
    //                             name: user.avatar.fileName,
    //                             type: user.avatar.type
    //                         })
    //                     } else {
    //                         form.append(key, user[key]);
    //                     }

    //             console.info(form);
    //             console.info(user.avatar);
    //             let res = await APIs.post(endpoints['register'], form, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             });
    //             if (res.status === 201)
    //                 nav.navigate("Login");
    //         } catch (ex) {
    //             console.log(ex);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }


    //     const updateState = (field, value) => {
    //         setUser(current => {
    //             return {...current, [field]: value}
    //         })
    //     }

    //     return (

    //         <View style={[MyStyles.container, MyStyles.margin]}>
    //             <ScrollView>
    //                 <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    //                     {fields.map(f => <TextInput value={user[f.name]} onChangeText={t => updateState(f.name, t)} key={f.label} style={MyStyles.margin} label={f.label} secureTextEntry={f.secureTextEntry} right={<TextInput.Icon icon={f.icon} />} />)}

    //                     <TouchableRipple onPress={picker}>
    //                         <Text style={MyStyles.margin}>Chọn hình đại diện...</Text>
    //                     </TouchableRipple>

    //                     <HelperText type="error" visible={error}>
    //                         Mật khẩu không khớp!
    //                     </HelperText>

    //                     {user?.avatar && <Image source={{uri: user.avatar.uri }} style={MyStyles.avatar} />}

    //                     <Button style={MyStyles.margin} loading={loading} icon="account" mode="contained" onPress={register}>
    //                         Đăng ký
    //                     </Button>
    //                 </KeyboardAvoidingView>
    //             </ScrollView>
    //         </View>

    // );
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            Alert.alert('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }

        // Bạn có thể thêm logic đăng ký tài khoản ở đây
        Alert.alert('Đăng ký thành công!', `Xin chào ${firstName} ${middleName}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tên:</Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Nhập tên của bạn"
            />
            <Text style={styles.label}>Họ và Tên lót:</Text>
            <TextInput
                style={styles.input}
                value={middleName}
                onChangeText={setMiddleName}
                placeholder="Nhập họ và tên lót"
            />
            <Text style={styles.label}>Tên đăng nhập:</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Nhập tên đăng nhập"
            />
            <Text style={styles.label}>Mật khẩu:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Nhập mật khẩu"
                secureTextEntry
            />
            <Text style={styles.label}>Xác nhận mật khẩu:</Text>
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry
            />
            <Button title="Đăng ký" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default Register;
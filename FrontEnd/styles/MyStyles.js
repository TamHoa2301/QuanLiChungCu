import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1
    }, subject: {
        fontSize: 25,
        fontWeight: "bold",
        color: "blue"
    }, row: {
        flexDirection: "row"
    }, wrap: {
        flexWrap: "wrap"
    },margin: {
        borderRadius: 10,
        margin: 10,
    }, avatar: {
        width: 80,
        height: 80,
        borderRadius: 20
    }, center: {
        alignSelf: "center"
    }, loginButton: {
        height:75,
        width: '80%',
        margin: 'auto',
        backgroundColor: 'pink',
        justifyContent: 'center',
    }, image: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1  ,
        height: 'auto',
        width: '90%',
        left: 40,
        borderRadius: 10,
    },
});
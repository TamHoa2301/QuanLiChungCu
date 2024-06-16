import { View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { Text } from "react-native-paper";

const KhaoSat = () => {
    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <Text style={MyStyles.subject}>Hien gio chua co khao sat</Text>
        </View>
    );
}

export default KhaoSat;
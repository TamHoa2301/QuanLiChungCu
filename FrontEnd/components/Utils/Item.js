import { List } from "react-native-paper";
import { Image } from "react-native";
import moment from "moment";
import MyStyles from "../../styles/MyStyles";

const Item = ({instance}) => {
    return <List.Item  title={instance.subject || instance.content} 
                description={instance.created_date?moment(instance.created_date).fromNow():""} 
                left={() => <Image style={MyStyles.avatar} source={{uri: instance.image || instance.user.avatar}} />}  />
}

export default Item;
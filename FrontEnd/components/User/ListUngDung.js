import { View, Text, FlatList, StyleSheet, TextInput, searchQuery, TouchableOpacity,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';



const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeText = (text) => {
    setSearchQuery(text);
    // Xử lý tìm kiếm dữ liệu dựa trên giá trị `text` ở đây
  }
};


const functions = [
  { id: '1', name: 'Home', icon: 'home' },
  { id: '2', name: 'Settings', icon: 'cog' },
  { id: '3', name: 'Profile', icon: 'user' },
  { id: '4', name: 'Notifications', icon: 'bell' },
  { id: '5', name: 'Messages', icon: 'envelope' },
  { id: '6', name: 'Home', icon: 'home' },
  { id: '7', name: 'Settings', icon: 'cog' },
  { id: '8', name: 'Profile', icon: 'user' },
];
const chunkedFunctions = chunkArray(functions, 4);
const image = { uri: 'https://images.pexels.com/photos/17364664/pexels-photo-17364664/free-photo-of-nha-c-a-nha-ngoi-nha-can-nha.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' };


const ListUngDung = () => {
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
      <View>
        <Text style={styles.chucNangText}>Danh sách tiện ích</Text>
      </View>
      {/* <View style={styles.FlatListContainer}>
        <FlatList
          data={chunkedFunctions}
          renderItem={({ item }) => (
            <FlatList
              data={item}
              renderItem={({ item }) => (
                <View style={styles.functionContainer}>
                  <Icon name={item.icon} size={30} color="#000" />
                  <Text style={styles.functionText}>{item.name}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View> */}
      <View style={styles.listChucNang}>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 2 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Chức năng A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 1 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Chức năng B</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 1 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Chức năng C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 3 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Chức năng D</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listChucNang}>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 2 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Chức năng A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 1 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Chức năng B</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 1 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Chức năng C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 3 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Chức năng D</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listChucNang}>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 2 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Chức năng A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 1 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Chức năng B</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 1 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Chức năng C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 3 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Chức năng D</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}></ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
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
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  FlatListContainer: {
    top: 40,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15, // Thiết lập borderRadius cho View bao quanh
    overflow: 'hidden',
  },
  functionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 30,
  },
  functionText: {
    marginTop: 5,
    fontSize: 16,
  },
  functionContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  functionText: {
    marginTop: 5,
    fontSize: 16,
  },
  chucNangText: {
    fontSize: 20, // Tùy chỉnh kích thước chữ
    color: 'green', // Tùy chỉnh màu chữ
    top: 30,
  },
  listChucNang: {
    top: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: 'auto',
  },
  functionItem: {
    backgroundColor: 'lightblue',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    alignItems:'center',
    borderRightWidth:1,
  },
  imageContainer: {
    width: 400,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden', // Ẩn các phần thừa của hình ảnh
    top: 50,
    left: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ListUngDung;
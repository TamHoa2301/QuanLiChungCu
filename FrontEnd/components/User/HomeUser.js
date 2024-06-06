import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Animated, Easing, ImageBackground } from 'react-native';
import { customText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';

const HomeUser = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuWidth = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const functions1 = [
    { id: '1', name: 'Home', icon: 'home', screen: 'HomeDetail' },
    { id: '2', name: 'Settings', icon: 'cog', screen: 'SettingsDetail' },
    { id: '3', name: 'Profile', icon: 'user', screen: 'ProfileDetail' },
  ];

  const image = { uri: 'https://images.pexels.com/photos/17364664/pexels-photo-17364664/free-photo-of-nha-c-a-nha-ngoi-nha-can-nha.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' };

  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Xin chào: tên</Text>
      <TouchableOpacity style={styles.thongBao}>
        <FontAwesome name="bell" size={24} color="black" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}></ImageBackground>
      </View>
      <View>
        <Text style={styles.chucNangText}>Danh sách tiện ích</Text>
      </View>
      <View style={styles.containerFlatList}>
        <FlatList
          data={functions1}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.functionContainer}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Icon name={item.icon} size={25} color="#000" />
              <Text style={styles.functionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <Text style={styles.dichVuText}>Các dịch vụ khác</Text>
      <View style={styles.listChucNang}>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 2 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Điện</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 1 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Nước</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 1 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Nhà</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { flexGrow: 3 }]}>
          <Icon name='bell' size={25} color="#000" />
          <Text>Thêm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  functionContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    top: 10,
    left: 10,
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
  functionText: {
    marginTop: 5,
    fontSize: 16,
  },
  containerFlatList: {
    top: 60,
    right: 10,
    left: 60,
    justifyContent: 'center',
    borderRadius: 15, // Thiết lập borderRadius cho View bao quanh
    overflow: 'hidden', // Ẩn các phần thừa của hình ảnh
    backgroundColor: 'white',
    width: '70%',
    height: '10%',
  },
  imageContainer: {
    width: 400,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden', // Ẩn các phần thừa của hình ảnh
    top: 30,
    left: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  helloText: {
    left: 10,
    fontSize: 24, // Tùy chỉnh kích thước chữ
    color: 'red', // Tùy chỉnh màu chữ
  },
  chucNangText: {
    fontSize: 20, // Tùy chỉnh kích thước chữ
    color: 'green', // Tùy chỉnh màu chữ
    top: 50,
    left: 10,
  },
  dichVuText: {
    fontSize: 20, // Tùy chỉnh kích thước chữ
    color: 'green', // Tùy chỉnh màu chữ
    top: 80,
    left: 10,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  thongBao: {
    position: 'absolute',
    top: 20, // Đặt vị trí từ phía trên xuống
    right: 20, // Đặt vị trí từ phía bên phải sang trái
    zIndex: 999, // Đảm bảo nút thông báo hiển thị trên tất cả các thành phần khác
  },
  listChucNang: {
    top: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: 'auto',
    backgroundColor:'white',
    height: 100,
  },
  functionItem: {
    backgroundColor: 'lightblue',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderRightWidth: 1,
    width: '25%',
  },
});

export default HomeUser;
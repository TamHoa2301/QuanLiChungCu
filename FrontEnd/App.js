import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useReducer, useState, useEffect } from 'react';
import { Icon } from 'react-native-paper';
import Register from './components/User/Register';
import Bill from './components/Bill/Bill';
import Login from './components/User/Login';
import Item from './components/Items/Item';
import UserProfile from './components/User/UserProfile';
import ItemDetail from './components/Items/ItemDetail';
import HomeUser from './components/User/HomeUser';
import Report from './components/User/Report';
import Bill_notPaid from './components/Bill/Bill_notPaid';
import Request from './components/User/Request';
import Bill_Paid from './components/Bill/Bill_Paid'
import HomeAdmin from './components/Admin/HomeAdmin';
import { MyDispatcherContext, MyUserContext } from './configs/Contexts';
import { MyUserReducer } from './configs/Reducers';
import { Alert } from 'react-native';
import ReportList from './components/User/ReportList';
import ReportAdmin from './components/Admin/ReportAdmin';
import BillAdmin from './components/Admin/BillAdmin';
import Storage from './components/Admin/Storage';
import BillDetails from './components/Bill/BillDetails';
import Apartment from './components/Admin/Apartment';
import Items from './components/Admin/Items';
import Hello from './components/User/Hello';
import Payment from './components/Bill/Payment';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Hello' component={Hello} options={{ title: 'Hello' }} />
      <Stack.Screen name='Login' component={Login} options={{ title: 'Đăng nhập' }} />
      <Stack.Screen name='HomeUser' component={HomeUser} options={{ title: 'HomeUser' }} />
      <Stack.Screen name='UserProfile' component={UserProfile} options={{ title: 'Thông tin người dùng' }} />
      <Stack.Screen name='ItemDetail' component={ItemDetail} options={{ title: 'Chi tiết đơn hàng' }} />
      <Stack.Screen name='Item' component={Item} options={{ title: 'Danh sách hàng' }} />
      <Stack.Screen name='Bill' component={Bill} options={{ title: 'Hóa đơn' }} />
      <Stack.Screen name='Bill_notPaid' component={Bill_notPaid} options={{ title: 'Bill_notPaid' }} />
      <Stack.Screen name='Bill_Paid' component={Bill_Paid} options={{ title: 'Bill_Paid' }} />
      <Stack.Screen name='Report' component={Report} options={{ title: 'Report' }} />
      <Stack.Screen name='HomeAdmin' component={HomeAdmin} options={{ title: 'HomeAdmin' }} />
      <Stack.Screen name='ReportList' component={ReportList} options={{ title: 'Report' }} />
      <Stack.Screen name='Request' component={Request} options={{ title: 'Request' }} />
      <Stack.Screen name='ReportAdmin' component={ReportAdmin} options={{ title: 'ReportAdmin' }} />
      <Stack.Screen name='BillAdmin' component={BillAdmin} options={{ title: 'BillAdmin' }} />
      <Stack.Screen name='Storage' component={Storage} options={{ title: 'Storage' }} />
      <Stack.Screen name='BillDetails' component={BillDetails} options={{ title: 'BillDetails' }} />
      <Stack.Screen name='Apartment' component={Apartment} options={{ title: 'Apartment' }} />
      <Stack.Screen name='Items' component={Items} options={{ title: 'Items' }} />
      <Stack.Screen name='Payment' component={Payment} options={{ title: 'Payment' }} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const MyTab = () => {
  const navigation = useNavigation();
  const user = useContext(MyUserContext);

  console.log(user)
  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Do you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            user === null;
            navigation.navigate('Login')
          }
        }
      ],
      { cancelable: false }
    );
  };
  console.log(user)
  return (
    <Tab.Navigator>
      <Tab.Screen name="Hello" component={MyStack} options={{
        title: "Hello", tabBarIcon: () => <Icon color='black' size={30} source="account" />
      }}
      />
      {user === null ? (
        <Tab.Screen name="Login" component={MyStack} options={{ title: "Login", tabBarIcon: () => <Icon color='black' size={30} source="account" /> }} />
      ) : (
        <>
          {user.is_staff ? (
            <Tab.Screen name="HomeAdmin" component={HomeAdmin} options={{
              title: "HomeAdmin", tabBarIcon: () => <Icon color='black' size={30} source="account" />
            }}
            />
          ) : (
            <Tab.Screen
              name="HomeUser" component={HomeUser} options={{
                title: "HomeUser", tabBarIcon: () => <Icon color='black' size={30} source="account" />
              }}
            />
          )}
          <Tab.Screen name="Logout" component={() => null} options={{
            title: "Logout", tabBarIcon: () => <Icon color='blue' size={30} source="account" />
          }}
            listeners={({ navigation }) => ({
              tabPress: (e) => {
                e.preventDefault();
                handleLogout(navigation);
              },
            })}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <NavigationContainer>
      <MyUserContext.Provider value={user}>
        <MyDispatcherContext.Provider value={dispatch}>
          <MyTab />
        </MyDispatcherContext.Provider>
      </MyUserContext.Provider>
    </NavigationContainer>
  );
}

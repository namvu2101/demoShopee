import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageComponent,
} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './Login';
import Regiter from './Regiter';
import UserLog from './UserLog';
import Setting from './Setting';
import Profile, {UpdateName} from './Profile';
import Test from './TodoList';
import MyTabs from './UiTab';
import {Provider} from 'react-redux';
import {store} from '../redux/Store';
import Cart from './Cart';
import ProDuct from './ProDuct';
import App from '../../App';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// function MyTabs() {

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         initialRouteName: false,
//         tabBarShowLabel: false,
//       }}
//      >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({focused}) => (
//             focused ?
//             <Image
//               source={require('../assets/home.png')}
//               style={styles.tabIcon}></Image>
//               :
//             <Image
//               source={require('../assets/unhome.png')}
//               style={styles.tabIcon}></Image>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Mall"
//         component={Mall}
//         options={{
//           tabBarIcon: ({focused}) => (
//             focused ?
//             <Image
//               source={require('../assets/mall.png')}
//               style={styles.tabIcon}></Image>
//               : <Image
//               source={require('../assets/bag.png')}
//               style={styles.tabIcon}></Image>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Notifi"
//         component={Notification}
//         options={{
//           tabBarIcon: ({focused}) => (
//             focused ?
//             <Image
//               source={require('../assets/notification.png')}
//               style={styles.tabIcon}></Image>
//               : <Image
//               source={require('../assets/unbell.png')}
//               style={styles.tabIcon}></Image>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="UserLog"
//         component={UserLog}
//         options={{
//           tabBarIcon: ({focused}) => (
//             focused ?
//             <Image
//               source={require('../assets/user_home.png')}
//               style={styles.tabIcon}></Image>
//               : <Image
//               source={require('../assets/unuser.png')}
//               style={styles.tabIcon}></Image>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
// const styles = StyleSheet.create({
//   tabIcon: {
//     height: 30,
//     width: 30,
//   },
// });

export default function Index() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeTabs">
          <Stack.Screen
            name="HomeTabs"
            component={MyTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            options={{
              title: 'Đăng Nhập',
              headerShown: false,
            }}
            component={Login}
          />
          <Stack.Screen
            name="Regiter"
            options={{
              title: 'Đăng ký',
              headerTintColor: 'red',
            }}
            component={Regiter}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Update"
            component={UpdateName}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Product"
            component={ProDuct}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="App"
            component={App}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

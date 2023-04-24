import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React from 'react';
import styles from '../style';
import Login from './Login';
import { useDispatch,useSelector,useEffect } from 'react-redux';

const UserLog = ({navigation,route}) => {
  const info = useSelector((state) => state.personalInfo)
  // const accountname = 'Nam vu'

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {/* --------------------- Header --------------------- */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{height: 150, backgroundColor: 'yellow'}}>
          <Image
            source={require('../assets/background.jpg')}
            style={{height: '100%', width: '100%', position: 'absolute'}}
            resizeMode="cover"></Image>
          <Header navigation={navigation} name={info.accountName}/>
          
        </TouchableOpacity>

        {/* --------------------- Body --------------------- */}
        <Item navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const DATA = [
  {
    id: '1',
    photo: require('../assets/banner.png'),
    title: 'Đơn nạp thẻ và Dịch vụ',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '2',
    photo: require('../assets/banner.png'),
    title: 'Đơn mua',
    title2: 'Xem lịch sử mua',
    onPress: 'Regiter',
  },
  {
    id: '3',
    photo: require('../assets/banner.png'),
    title: 'Tiện ích của tôi',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '4',
    photo: require('../assets/banner.png'),
    title: 'Bảo hiểm của tôi',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '5',
    photo: require('../assets/banner.png'),
    title: 'Đã mua',
    title2: 'Xem thêm sản phẩm',
    onPress: 'Login',
  },
  {
    id: '6',
    photo: require('../assets/banner.png'),
    title: 'Bắt đầu bán',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '7',
    photo: require('../assets/banner.png'),
    title: 'Khách hàng thân thiết',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '8',
    photo: require('../assets/banner.png'),
    title: 'Đã thích',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '9',
    photo: require('../assets/banner.png'),
    title: 'Đã cem gần đây',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '10',
    photo: require('../assets/banner.png'),
    title: 'Số dư tài khoản',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '11',
    photo: require('../assets/banner.png'),
    title: 'Shopee Xu',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '12',
    photo: require('../assets/banner.png'),
    title: 'Đánh giá',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '13',
    photo: require('../assets/banner.png'),
    title: 'Liên kết',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '14',
    photo: require('../assets/banner.png'),
    title: 'Thiết lập tài khoản',
    title2: '',
    onPress: 'Profile',
  },
  {
    id: '15',
    photo: require('../assets/banner.png'),
    title: 'Trung tâm trợ giúp',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '16',
    photo: require('../assets/banner.png'),
    title: 'Tro chuyen',
    title2: '',
    onPress: 'Login',
  },
];
const listdamua = [
  {
    id: '1',
    name: 'San pham1',
    photo: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB5chO5Lsrlzm6_fT0I-OQ5IJrQ6AAI10TzhnK2ZdSjgyIFwmXa5K9F-kegdyLf--GvA&usqp=CAU',
    },
    price: '27.390.000',
  },
  {
    id: '2',
    name: 'san pham2',
    photo: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs07usS1wgql-pvo4VpvxRcnH6YWvbrWhqaB-jE8NkNpRJe3cxYE6J5QDV_Za730xZf5g&usqp=CAU',
    },
    price: '100.000.000',
  },
  {
    id: '3',
    name: 'san pham 3',
    photo: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQvhtLaUAxCvHVVMv96uaJGzFokMyjQ69foA&usqp=CAU',
    },
    price: '111.111.111',
  },
  {
    id: '4',
    name: 'san pham 4',
    photo: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQvhtLaUAxCvHVVMv96uaJGzFokMyjQ69foA&usqp=CAU',
    },
    price: '111.111.111',
  },
  {
    id: '5',
    name: 'san pham 5',
    photo: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQvhtLaUAxCvHVVMv96uaJGzFokMyjQ69foA&usqp=CAU',
    },
    price: '111.111.111',
  },
  {
    id: '6',
    name: 'San pham 6',
    photo: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB5chO5Lsrlzm6_fT0I-OQ5IJrQ6AAI10TzhnK2ZdSjgyIFwmXa5K9F-kegdyLf--GvA&usqp=CAU',
    },
    price: '27.390.000',
  },
  {
    id: '7',
    name: 'San pham 7',
    photo: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB5chO5Lsrlzm6_fT0I-OQ5IJrQ6AAI10TzhnK2ZdSjgyIFwmXa5K9F-kegdyLf--GvA&usqp=CAU',
    },
    price: '27.390.000',
  },
];

function ListBuy() {
  return (
    <FlatList
      horizontal={true}
      data={listdamua}
      renderItem={({item}) => (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              height: '90%',
              width: 80,
              borderColor: 'red',
              borderWidth: 1,
              marginHorizontal: 5,
              alignItems: 'center',
            }}>
            <Image
              source={item.photo}
              style={{height: '60%', width: '100%'}}
              resizeMode="stretch"></Image>
            <Text>{item.name}</Text>
          </View>
        </View>
      )}
      keyExtractor={item => item.id}></FlatList>
  );
}
function Header({navigation, name}) {
 
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 1,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Image
              source={require('../assets/settings.png')}
              style={styles.icon}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Image
              source={require('../assets/shopping-cart.png')}
              style={styles.icon}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Image
              source={require('../assets/bubble-chat.png')}
              style={styles.icon}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 2, justifyContent: 'flex-end'}}>
        <View
          style={{
            height: '80%',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 20,
          }}>
          <View style={{height: '80%', width: 65}}>
            <Image
              source={require('../assets/avatar.jpg')}
              style={{height: '100%', width: '100%', borderRadius: 50}}
              resizeMode="cover"></Image>
          </View>
          <View>
            <Text>{name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>Nguoi theo doi</Text>
              <View
                style={{
                  height: 20,
                  width: 1,
                  backgroundColor: 'black',
                  marginHorizontal: 10,
                }}></View>
              <Text>Dang theo doi</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function Item({navigation}) {
  return (
    <View>
      {DATA.map((item, index) => (
        <View key={item.id}>
          {index == 2 ? (
            <View>
              <View
                style={{
                  height: 80,
                  backgroundColor: 'white',
                  flex: 1,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../assets/user.png')}
                    style={styles.imgs}></Image>
                  <Text>Chờ xác nhận</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../assets/user.png')}
                    style={styles.imgs}></Image>
                  <Text>Chờ lấy hàng</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../assets/user.png')}
                    style={styles.imgs}></Image>
                  <Text>Đang giao</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../assets/user.png')}
                    style={styles.imgs}></Image>
                  <Text>Đánh giá</Text>
                </View>
              </View>
              <View style={{height: 10, backgroundColor: 'pink'}}></View>
            </View>
          ) : index == 3 ? (
            <View
              style={{
                height: 100,
                backgroundColor: 'white',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/user.png')}
                  style={styles.imgs}></Image>
                <Text>Ví ShopeePay</Text>
                <Text>Sử dụng ngay</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/user.png')}
                  style={styles.imgs}></Image>
                <Text>Shopee Xu</Text>
                <Text>0 Xu</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/user.png')}
                  style={styles.imgs}></Image>
                <Text>Kho Voucher</Text>
                <Text>50+ Voucher</Text>
              </View>
            </View>
          ) : index == 4 ? (
            <View style={{height: 10, backgroundColor: 'pink'}}></View>
          ) : index == 5 ? (
            <View
              style={{
                height: 150,
                backgroundColor: 'white',
                alignItems: 'center',
              }}>
              <ListBuy />
            </View>
          ) : index == 13 ? (
            <View style={{height: 10, backgroundColor: 'pink'}}></View>
          ) : null}
          <TouchableOpacity
            onPress={() => navigation.navigate(`${item.onPress}`)}
            style={{
              height: 50,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={item.photo} style={styles.imgs}></Image>
              <Text>{item.title}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>{item.title2}</Text>
              <Image
                source={require('../assets/next.png')}
                style={styles.imgs}></Image>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

export default UserLog;

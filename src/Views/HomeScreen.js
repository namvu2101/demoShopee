import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import styles from './style';
import {SafeAreaView} from 'react-native-safe-area-context';

const DATA = [
  {
    id: '1',
    photo: require('../assets/banner.png'),
    title: 'First icon',
  },
  {
    id: '2',
    photo: require('../assets/banner.png'),
    title: 'Second',
  },
  {
    id: '3',
    photo: require('../assets/banner.png'),
    title: 'Third icon',
  },
  {
    id: '4',
    photo: require('../assets/banner.png'),
    title: 'Four icon',
  },
  {
    id: '5',
    photo: require('../assets/banner.png'),
    title: 'Fine icon',
  },
];
const dataSP = [
  {
    id: '1',
    photo: require('../assets/banner.png'),
  },
  {
    id: '2',
    photo: require('../assets/banner.png'),
  },
  {
    id: '3',
    photo: require('../assets/banner.png'),
  },
  {
    id: '4',
    photo: require('../assets/banner.png'),
  },
  {
    id: '5',
    photo: require('../assets/banner.png'),
  },
  {
    id: '6',
    photo: require('../assets/banner.png'),
  },
  {
    id: '7',
    photo: require('../assets/banner.png'),
  },
];
const datalist = [
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
    id: '1',
    name: 'San pham 6',
    photo: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB5chO5Lsrlzm6_fT0I-OQ5IJrQ6AAI10TzhnK2ZdSjgyIFwmXa5K9F-kegdyLf--GvA&usqp=CAU',
    },
    price: '27.390.000',
  },
  {
    id: '1',
    name: 'San pham 7',
    photo: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB5chO5Lsrlzm6_fT0I-OQ5IJrQ6AAI10TzhnK2ZdSjgyIFwmXa5K9F-kegdyLf--GvA&usqp=CAU',
    },
    price: '27.390.000',
  },
];

const ItemSP = item => {
  return (
    <View
      style={{
        borderRightColor: 'red',
        borderRightWidth: 0.5,
        justifyContent: 'center',
      }}>
      <TouchableOpacity>
        <View
          style={{alignItems: 'center', marginHorizontal: 10, height: '90%'}}>
          <Image
            source={item.title.photo}
            style={styles.item}
            resizeMode="stretch"></Image>
          <Text>Giá 0đ</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const ItemList = item => {
  return (
    <View style={{width: '50%'}}>
      <TouchableOpacity>
        <View style={styles.view_product}>
          <View style={{height: 180, width: '100%'}}>
            <Image
              source={item.title.photo}
              style={{height: '100%', width: '100%'}}
              resizeMode="stretch"></Image>
          </View>
          <View style={{backgroundColor: 'red'}}>
            <Text>{item.title.name}</Text>
            <Text>{item.title.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Item = item => {
  return (
    <View
      style={{
        justifyContent: 'space-around',
        height: '90%',
        backgroundColor: 'white',
      }}>
      <TouchableOpacity>
        <View style={styles.box_icon}>
          <View style={styles.boder_icon}>
            <Image source={item.title.photo} style={styles.icon} />
          </View>

          <Text>{item.title.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({navigation, route, params}) => {
  return (
    <View style={styles.container}>
      <ScrollView >
        <View style={{flex: 1}}>
          {/* --------------------- Banner --------------------- */}

          <View style={styles.header}>
            <Image
              source={require('../assets/banner.png')}
              style={styles.banner}
              resizeMode="stretch"></Image>
          </View>

          {/* --------------------- Body --------------------- */}

          {/* --------------------- BodyTop --------------------- */}
          <View style={styles.body}>
            <View>
              <View style={styles.below_header}>
                <View style={styles.scaner_box}>
                  <View style={{width: '16%', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/scanner.png')}
                      style={styles.imgs}></Image>
                  </View>
                  <View
                    style={{
                      width: '42%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderLeftColor: 'red',
                      borderRightColor: 'red',
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                      height: 40,
                    }}>
                    <Image
                      source={require('../assets/scanner.png')}
                      style={styles.imgs}></Image>
                    <TextInput>Shopee Pay</TextInput>
                  </View>
                  <View
                    style={{
                      width: '42%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 40,
                    }}>
                    <Image
                      source={require('../assets/scanner.png')}
                      style={styles.imgs}></Image>
                    <TextInput>Shopee Pay</TextInput>
                  </View>
                </View>
              </View>

              <View style={styles.body_top}>
                <FlatList
                  horizontal={true}
                  data={DATA}
                  renderItem={({item}) => <Item title={item} />}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>

            {/* --------------------- Body Center--------------------- */}
            <View style={styles.body_center}>
              <View
                style={{
                  backgroundColor: 'blue',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 60,
                  borderRadius: 5,
                  height: 40,
                  marginBottom: 20,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>
                  TẶNG KHÁCH HÀNG MỚI
                </Text>
              </View>

              {/* ---------------------Top--------------------- */}

              <View style={styles.center_top}>
                <Text>VOUCHER TẶNG BẠN</Text>
                <View style={styles.box_center_top}>
                  <View style={styles.item_center_top}>
                    <View style={styles.view_voucher}>
                      <Text>Free Ship</Text>
                    </View>
                    <View style={styles.box_voucher}></View>
                  </View>
                </View>
              </View>

              {/* --------------------- BOT --------------------- */}

              <View style={styles.center_bot}>
                <View>
                  <Text>ĐƠN ĐẦU TIÊN 0Đ</Text>
                </View>

                <View style={styles.view_item_center_bot}>
                  {/* --------------------- Item --------------------- */}
                  <View>
                    <FlatList
                      horizontal={true}
                      data={dataSP}
                      renderItem={({item}) => <ItemSP title={item} />}
                      keyExtractor={item => item.id}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* --------------------- End Body2 --------------------- */}

            {/* ---------------------ListView--------------------- */}
            <View style={styles.listview}>
              <Text style={{color: 'red', fontWeight: 'bold', marginLeft: 10}}>
                DEAL GIÁ TỐT CHO BẠN MỚI
              </Text>

              <View
                style={{
                  flex: 1,
                  backgroundColor: 'pink',
                  flexDirection: 'row',
                }}>
                {/* ---------------------San pham 1--------------------- */}
                <FlatList
                  horizontal={false}
                  numColumns={2}
                  data={datalist}
                  renderItem={({item}) => (
                    <ItemList title={item}></ItemList>
                  )}></FlatList>
              </View>
            </View>

            {/* -------------------s-- End ListView--------------------- */}
          </View>
        </View>
      </ScrollView>
      <View style={styles.top_header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.boxsearch}>
            <Image
              source={require('../assets/search.png')}
              style={styles.imgs}></Image>
            <TextInput
              style={{
                width: '80%',
              }}
              placeholder="Search"></TextInput>
            <View>
              <TouchableOpacity>
                <Image
                  source={require('../assets/camera.png')}
                  style={styles.imgs}></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: '20%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Image
              source={require('../assets/shopping-cart.png')}
              style={styles.imgs}></Image>
            <Image
              source={require('../assets/chat.png')}
              style={styles.imgs}></Image>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

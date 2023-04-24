import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import styles from '../style';

const DATA = [
  {
    id: '1',
    photo: require('../assets/banner.png'),
    title: 'Tặng',
    onPress: 'Login'
  },
  {
    id: '2',
    photo: require('../assets/banner.png'),
    title: 'Gì',
    onPress: 'Login'
  },
  {
    id: '3',
    photo: require('../assets/banner.png'),
    title: 'Mã',
    onPress: 'Login'
  },
  {
    id: '4',
    photo: require('../assets/banner.png'),
    title: 'Miễn phí',
    onPress: 'Login'
  },
];

const datalist = [
  {
    id: '1',
    photo: require('../assets/banner.png'),
    title: 'Tặng',
  },
  {
    id: '2',
    photo: require('../assets/banner.png'),
    title: 'Gì',
  },
  {
    id: '3',
    photo: require('../assets/banner.png'),
    title: 'Mã',
  },
  {
    id: '4',
    photo: require('../assets/banner.png'),
    title: 'Miễn phí',
  },
  {
    id: '5',
    photo: require('../assets/banner.png'),
    title: 'Tặng',
  },
  {
    id: '6',
    photo: require('../assets/banner.png'),
    title: 'Gì',
  },
  {
    id: '7',
    photo: require('../assets/banner.png'),
    title: 'Mã',
  },
  {
    id: '8',
    photo: require('../assets/banner.png'),
    title: 'Miễn phí',
  },
];
const List = item => {
  return (
    <TouchableOpacity>
       <View
      style={{
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={item.title.photo} style={styles.imgs}></Image>
        <Text>{item.title.title}</Text>
      </View>

      <Image
        source={require('../assets/next.png')}
        style={styles.imgs}></Image>
    </View>
    </TouchableOpacity>
   
  );
};

const Icon = item => {
  return (

      <View style={styles.box_icon}>
        <View style={styles.boder_icon}>
          <Image source={item.title.photo} style={styles.icon} />
        </View>
        <Text>{item.title.title}</Text>
      </View>

  );
};


const User = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView scrollEnabled={true}>
        <View style={{flex: 1}}>
          {/* --------------------- Header --------------------- */}

          <View style={{height: '10%', backgroundColor: 'red'}}>
            <View style={styles.header}>
              {/* view top_header */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  flex: 1,
                }}>
                <Image
                  source={require('../assets/settings.png')}
                  style={styles.icon}></Image>
                <Image
                  source={require('../assets/shopping-cart.png')}
                  style={styles.icon}></Image>
                <Image
                  source={require('../assets/bubble-chat.png')}
                  style={styles.icon}></Image>
              </View>
              {/* view bot_header */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      width: 40,
                      height: '80%',
                    }}>
                    <Image
                      source={require('../assets/user_home.png')}
                      style={styles.imgs}></Image>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    height: '100%',
                    width: '90%',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <View
                      style={{
                        height: '90%',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        height: '100%',
                        width: 90,
                        alignItems: 'center',
                        height: '80%',
                      }}>
                      <Text style={{color: 'red', fontWeight: 'bold'}}>
                        Đăng nhập
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Regiter')}>
                    <View
                      style={{
                        height: '90%',
                        borderColor: 'white',
                        justifyContent: 'center',
                        borderWidth: 2,
                        marginHorizontal: 10,
                        height: '100%',
                        width: 90,
                        alignItems: 'center',
                        height: '80%',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}>
                        Đăng ký
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* --------------------- Body --------------------- */}
          <View style={{backgroundColor: 'pink'}}>
            <View
              style={{backgroundColor: 'white', marginTop: 10, height: 250}}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Image
                    source={require('../assets/banner.png')}
                    style={styles.imgs}></Image>
                  <Text>Ưu đãi dành riêng cho bạn</Text>
                </View>

                <View
                  style={{
                    flex: 2,
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.5,
                    marginLeft: 10,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'center',
                    }}>
                    {/* <TouchableOpacity>
                      <View style={styles.box_icon}>
                        <View style={styles.boder_icon}>
                          <Image
                            source={require("../../assets/banner.png")}
                            style={styles.icon}
                          />
                        </View>

                        <Text>aaaaa</Text>
                      </View>
                    </TouchableOpacity> */}
                    <FlatList
                      horizontal={true}
                      contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                      }}
                      data={DATA}
                      renderItem={({item}) => 
                      <TouchableOpacity 
                      key={item.title.id}
                      onPress={()=>
                      navigation.navigate(`${item.onPress}`)}>
                        <Icon title={item} />
                      </TouchableOpacity>
                      }
                      keyExtractor={item => item.id}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/banner.png')}
                      style={styles.imgs}></Image>
                    <Text>Đơn nạp thẻ và Dịch vụ</Text>
                  </View>

                  <Image
                    source={require('../assets/next.png')}
                    style={styles.imgs}></Image>
                </View>

                <View
                  style={{
                    flex: 1,
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/banner.png')}
                      style={styles.imgs}></Image>
                    <Text>Đơn mua</Text>
                  </View>

                  <Image
                    source={require('../assets/next.png')}
                    style={styles.imgs}></Image>
                </View>
              </View>
            </View>

            <View
              style={{height: 200, backgroundColor: 'white', marginTop: 10}}>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../assets/banner.png')}
                    style={styles.imgs}></Image>
                  <Text>Đơn nạp thẻ và Dịch vụ</Text>
                </View>

                <Image
                  source={require('../assets/next.png')}
                  style={styles.imgs}></Image>
              </View>

              <View
                style={{
                  flex: 2,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                  justifyContent: 'space-around',
                }}>
                <FlatList
                  horizontal={true}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                  }}
                  data={DATA}
                  renderItem={({item}) => <Icon title={item} />}
                  keyExtractor={item => item.id}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('..//assets/banner.png')}
                    style={styles.imgs}></Image>
                  <Text>Đơn nạp thẻ và Dịch vụ</Text>
                </View>

                <Image
                  source={require('../assets/next.png')}
                  style={styles.imgs}></Image>
              </View>
            </View>

            <View
              style={{height: 400, backgroundColor: 'white', marginTop: 10}}>
              <FlatList
                data={datalist}
                renderItem={({item}) => <List title={item} />}
                keyExtractor={item => item.id}
              />
            </View>

            <View
              style={{flex: 3, backgroundColor: 'white', marginTop: 10}}>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Image
                  source={require('../assets/banner.png')}
                  style={styles.imgs}></Image>
                <Text>Ưu đãi dành riêng cho bạn</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Image
                  source={require('../assets/banner.png')}
                  style={styles.imgs}></Image>
                <Text>Ưu đãi dành riêng cho bạn</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Image
                  source={require('../assets/banner.png')}
                  style={styles.imgs}></Image>
                <Text>Ưu đãi dành riêng cho bạn</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default User;

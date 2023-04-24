import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import styles from './style';
import {dataSF} from './Data';
import db from '../../db.json';

const dbase = firebase.firestore();

const ProDuct = ({navigation, route}) => {
  const IDProduct = route.params.IDProduct;
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setisSelected] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [data, setdata] = useState('')

   
  const filterIDProducts = db.ProDuct.filter(
    ProDuct => ProDuct.id === IDProduct
  );
  const onCloseAndChangeScreen = () => {
    return 
      setModalVisible(false)
     navigation.navigate('Cart');
  };
  
  useEffect(() => {
    const getCartItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@cart_items');
        if (jsonValue != null) {
          setCartItems(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error(e);
      }
    };

    getCartItems();
  }, []);
  useEffect(()=>{
    const getUsers = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('email');
       
        if (jsonValue != null) {
            setdata(jsonValue)
        }
      } catch (e) {
        console.error(e);
      }
    };
  
    getUsers();
  },[data])
  useEffect(() => {
    const saveCartItems = async () => {
      try {
        const jsonValue = JSON.stringify(cartItems);
        await AsyncStorage.setItem('@cart_items', jsonValue);
        
      } catch (e) {
        console.error(e);
      }
    };
    saveCartItems();
  }, [cartItems]);
 
  const handleSubmit = (item) => {
    const name = item.name
    const price = item.price
    const id =item.id
    const img = item.photo
    const product = {data,id,name, price,img, quantity: 1};
    handleAddProduct(product);
    dbase.collection('cart').add({
      product
  })
    console.log('dataMoi lam:',product);
    navigation.navigate('Cart');
  };
  const handleAddProduct = product => {
    const itemIndex = cartItems.findIndex(item => item.id === product.id);
    if (itemIndex !== -1) {
      const updatedItem = {
        ...cartItems[itemIndex],
        quantity: cartItems[itemIndex].quantity + 1,
      };
      handleUpdateCartItem(updatedItem);
    } else {
      const newCartItem = {...product, id: product.id};
      setCartItems([...cartItems, newCartItem]);
    }
  };
  const handleUpdateCartItem = item => {
    const updatedCartItems = cartItems.map(i => (i.id === item.id ? item : i));
    setCartItems(updatedCartItems);
  };

  
  const title = isSelected ? 'Xem thêm' : 'Thu gọn';

  return (
    <View
      style={{
        flex: 1,
      }}>
      {filterIDProducts.map(item => (
        <View style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }} key={item.id}> 
        <ScrollView >
          <View style={{flex: 1}}>
            <View style={{height: 400, width: '100%'}}>
              <PhotoProduct item={item} />
            </View>

            <View
              style={{
                height: 100,
                width: '100%',
                backgroundColor: 'white',
                justifyContent: 'center',
                marginHorizontal: 10,
              }}>
              <Text style={{color: 'black', fontSize: 20}}>{item.name}</Text>
              <Text style={{color: 'red', fontSize: 20}}>{item.price} ₫</Text>
            </View>

            <View style={{height: 10, backgroundColor: 'pink'}}></View>

            <View
              style={{
                height: 200,
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: 200,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../assets/avatar.jpg')}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 50,
                      marginHorizontal: 10,
                    }}></Image>
                  <View>
                    <Text>Name Shop</Text>
                    <Text>Online Shop</Text>
                  </View>
                </View>

                <View
                  style={{
                    borderColor: 'red',
                    borderWidth: 2,
                    height: 40,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Text>Xem shop</Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                }}></View>
            </View>

            <View style={{height: 10, backgroundColor: 'pink'}}></View>

            <View
              style={{
                height: 180,
                width: '100%',
                backgroundColor: 'white',
                justifyContent: 'flex-end',
              }}>
              <Text>Cac san pham khac</Text>
              <View style={{height: 140, marginBottom: 10}}>
                <ScrollView horizontal>
                  <ListPdShop item={item} />
                </ScrollView>
              </View>
            </View>

            <View style={{height: 10, backgroundColor: 'pink'}}></View>

            {/* CHI TIẾT MÔ TẢ SẢN PHẨM */}
            <View
              style={{
                marginHorizontal: 10,
              }}>
              <View style={isSelected ? {height: 300} : null}>
                <Text
                  style={{
                    marginVertical: 5,
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Mô tả sản phẩm
                </Text>
                <Text style={{color: 'black'}}>{item.detail}</Text>
              </View>

              <TouchableOpacity
                onPress={() => setisSelected(!isSelected)}
                style={{
                  height: 50,
                  borderTopColor: 'grey',
                  borderTopWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}>
                <Text style={{fontSize: 15, color: 'red'}}>{title}</Text>
              </TouchableOpacity>
            </View>

            <View style={{height: 10, backgroundColor: 'pink'}}></View>

            {/* ĐÁNH GIÁ SẢN PHẨM */}
            <View style={{marginHorizontal: 10,height:400}}>
              <Text
                style={{
                  marginVertical: 5,
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                Đánh giá sản phẩm
              </Text>
              <TouchableOpacity
                onPress={() => setisSelected(!isSelected)}
                style={{
                  height: 50,
                  borderTopColor: 'grey',
                  borderTopWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}>
                <Text style={{fontSize: 15, color: 'red'}}>{title}</Text>
              </TouchableOpacity>
            </View>

            <View style={{backgroundColor:'#2122',height:1000}}>
              <View style={{height:40,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <View style={{height:0.5,width:40,backgroundColor:'black',marginHorizontal:10}}/>
                <Text style={{color:'black'}}>Có thể bạn cũng thích</Text>
                <View style={{height:0.5,width:40,backgroundColor:'black',marginHorizontal:10}}/>
              </View>
            </View>
          </View>
        </ScrollView>
      
      
      <Header navigation={navigation} />
      <Footer
        onPress={() => {
          // setModalVisible(!modalVisible)
          handleSubmit(item)
        }}
      />
      </View>))}
      <ModalView
        onClose={onCloseAndChangeScreen}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {modalVisible ? (
        <View
          style={{
            backgroundColor: 'black',
            height: '100%',
            width: '100%',
            position: 'absolute',
            opacity: 0.4,
          }}></View>
      ) : null}
    </View>
  );
};

function ModalView({modalVisible, setModalVisible, onClose}) {
  const luachon = [
    {
      id: 1,
      title: 'luachon1',
    },
    {id: 2, title: 'luachon2'},
    {id: 3, title: 'luachon3'},
  ];
  const [number, setnumber] = useState(1);
  const [IsSelected, setIsSelected] = useState();

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{flex: 1, width: '100%'}}
          onPress={() => {
            setModalVisible(false);
            setIsSelected();
          }}></TouchableOpacity>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            flex: 1,
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <View style={{flex: 1}}>
            <View style={{alignItems: 'flex-end', marginHorizontal: 20}}>
              <Text
                style={{fontSize: 25}}
                onPress={() => {
                  setModalVisible(false);
                  setIsSelected();
                }}>
                X
              </Text>
            </View>
            <View
              style={{
                flex: 4,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Image
                source={require('../assets/avatar.jpg')}
                style={{height: 60, width: 60}}
              />
              <View>
                <Text>4000210</Text>
                <Text>Kho:12</Text>
              </View>
            </View>

            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Text>Size</Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                }}>
                {luachon.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      item.id === IsSelected
                        ? {borderColor: 'red', borderWidth: 1}
                        : null,
                      {backgroundColor: 'pink', flexDirection: 'row'},
                    ]}
                    onPress={() => {
                      IsSelected == item.id
                        ? setIsSelected()
                        : setIsSelected(item.id);
                    }}>
                    <Image
                      source={require('../assets/user.png')}
                      style={{height: 30, width: 20}}
                    />
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View
              style={{
                flex: 2,
                justifyContent: 'space-between',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text> SO luong</Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setnumber(number - 1);
                  }}
                  disabled={number < 2 ? true : false}>
                  <Text>-</Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>{number}</Text>
                </View>

                <TouchableOpacity
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setnumber(number + 1);
                  }}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flex: 2, justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={onClose}
                disabled={!IsSelected ? true : false}
                style={[
                  {
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  IsSelected
                    ? {backgroundColor: 'red'}
                    : {backgroundColor: 'grey'},
                ]}>
                <Text>Mua Ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Header({navigation}) {
  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue',
        width: '100%',
        paddingLeft: 20,
        position: 'absolute',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: 30,
          width: 30,
          backgroundColor: 'pink',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/back.png')}
          style={styles.imgs}></Image>
      </TouchableOpacity>

      <View
        style={{
          height: '80%',
          width: '50%',
          flexDirection: 'row',
          marginHorizontal: 10,
          alignItems: 'center',
          backgroundColor: 'white',
          justifyContent: 'space-around',
          borderRadius: 8,
        }}>
        <Image
          source={require('../assets/search.png')}
          style={styles.imgs}></Image>
        <TextInput
          style={{
            width: '80%',
          }}
          placeholder="Search"></TextInput>
      </View>

      <View
        style={{
          width: '30%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            backgroundColor: 'pink',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/share.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={{
            height: 30,
            width: 30,
            backgroundColor: 'pink',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/shopping-cart.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            backgroundColor: 'pink',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/three-dots.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function PhotoProduct({item}) {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Image
          source={{uri: item.photo}}
          style={{height: '100%', width: 400}}
          resizeMode="stretch"></Image>
        <View
          style={{
            height: 20,
            width: 40,
            backgroundColor: 'red',
            position: 'absolute',
          }}></View>
      </View>
    </View>
  );
}
function Footer({onPress}) {
  return (
    <View style={{height: 50, flexDirection: 'row'}}>
      <View
        style={{
          backgroundColor: 'grey',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <Image
            source={require('../assets/bubble-chat.png')}
            style={{height: 40, width: 40}}></Image>
        </TouchableOpacity>
        <View
          style={{height: '80%', width: 1.5, backgroundColor: 'black'}}></View>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../assets/shopping-cart.png')}
            style={{height: 40, width: 40}}></Image>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={()=>Alert.alert('chuyen trang thanh toan')}
        style={{
          backgroundColor: 'red',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Mua với Voucher</Text>
      </TouchableOpacity>
    </View>
  );
}
const data = [
  {
    id: '1',
    photo: {
      uri: 'https://down-vn.img.susercontent.com/file/sg-11134201-22100-64nigkkzx8hv30',
    },
  },
  {
    id: '2',
    photo: {
      uri: 'https://down-vn.img.susercontent.com/file/sg-11134201-22100-uqpp5h6xreiv8a_tn',
    },
  },
  {
    id: '3',
    photo: {
      uri: 'https://down-vn.img.susercontent.com/file/sg-11134201-22100-352mwk6xreiv17_tn',
    },
  },
];
function ListPdShop({item}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {dataSF.map(item => (
        <TouchableOpacity
          key={item.id}
          style={{
            height: '100%',
            width: 80,
            borderColor: 'red',
            borderWidth: 1,
            marginHorizontal: 5,
            alignItems: 'center',
          }}>
          <Image
            source={item.photo}
            style={{height: 70, width: 70}}
            resizeMode="stretch"></Image>
          <Text>{item.name}</Text>
          <Text numberOfLines={1}>{item.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
export default ProDuct;

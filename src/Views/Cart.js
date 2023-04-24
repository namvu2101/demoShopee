import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
  Pressable,
  Alert,
} from 'react-native';

import React, {useState,useEffect} from 'react';
import {dataCart} from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Cart = ({navigation}) => {
  const [selected, setSelected] = useState([]);
  const [ISselected, setIsSelected] = useState(false);
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getCartItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@cart_items');
        if (jsonValue != null) {
          setItems(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error(e);
      }
    };

    getCartItems();
  }, []);
  useEffect(() => {
    const saveCartItems = async () => {
      try {
        const jsonValue = JSON.stringify(Items);
        await AsyncStorage.setItem('@cart_items', jsonValue);
      } catch (e) {
        console.error(e);
      }
    };
    saveCartItems();
  }, [Items]);

  const [asyncStorageData, setAsyncStorageData] = useState([]);
  useEffect(() => {
    const getAsyncStorageData = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);
      setAsyncStorageData(data);
    };
    getAsyncStorageData();
  }, []);
console.log(JSON.stringify(asyncStorageData));
  const total = Items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    1
  );
  return (
    <View style={styles.container}>
      <View style={styles.headers}>
        <Header navigation={navigation}/>
      </View>
      <View style={styles.body}>
        <Body selected={selected} setSelected={setSelected} Items={Items} setItems={setItems} />
      </View>
      <View style={styles.footer}>
        <Footer
          navigation={navigation}
          total={total}
        />
      </View>
    </View>
  );
};

function Header({navigation}) {
  return (
    <View style={styles.box_header}>
      <View style={styles.box_back}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/back.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Giỏ hàng (11)</Text>
      </View>
      <View style={styles.box_chat}>
        <Text>Sửa</Text>
        <TouchableOpacity>
          <Image
            source={require('../assets/chat.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CheckBox() {
  return (
    <TouchableOpacity
      onPress={() => {
        setIsSelect(!IsSelect);
      }}
      style={[
        {
          width: 20,
          height: 20,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 5,
          marginLeft: 20,
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: 20,
        },
      ]}></TouchableOpacity>
  );
}

function Body({selected, setSelected,Items,setItems}) {
  const [number, setnumber] = useState(1);
  const [DelItem, setDelItem] = useState(false)

  const handleRemoveCartItem = item => {
    const updatedCartItems = Items.filter(i => i.id !== item.id);
    Alert.alert(
      'Thông báo',
      'Bạn có muốn xóa sản phẩm này không?',
      [
        {
          text: 'Hủy',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => setItems(updatedCartItems),
        },
      ],
      { cancelable: false }
    
    )
    
  };
  const handleUpdateCartItem = item => {
    const updatedCartItems = Items.map(i => (i.id === item.id ? item : i));
    setItems(updatedCartItems);
  };

  const handleCheck = id => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  function CartItem({item}) {
    const handleQuantityChange = value => {
      const updatedItem = {...item, quantity: item.quantity + value};
      handleUpdateCartItem(updatedItem);
    };
    return (
      <View style={{height: 150}}>
        <View style={{height: 140, alignItems: 'center', flexDirection: 'row',justifyContent:'space-around',marginRight:20}}>
          <TouchableOpacity
            onPress={() => handleCheck(item)}
            style={[
              {
                width: 20,
                height: 20,
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 5,
                marginLeft: 20,
                alignItems: 'center',
                flexDirection: 'row',
                marginHorizontal: 20,
              },
              selected.includes(item) && styles.checked,
            ]}>
            {selected.includes(item) ? (
              <Image
                source={require('../assets/check.png')}
                style={{height: 20, width: 20}}
              />
            ) : null}
          </TouchableOpacity>

          <Image source={{uri:item.img}} style={{height: 80, width: 80,marginHorizontal:20}} />
          
          <View
            style={{
              width: '60%',
              marginHorizontal: 20,
              height: '100%',
              justifyContent:'center'
              
            }}>
            <Text numberOfLines={1}>{item.name}</Text>
            <Text>{item.price}</Text>
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
                onPress={() => 
                  handleQuantityChange(-1)}
                disabled={item.quantity < 2 ? true : false}>
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
                <Text>{item.quantity}</Text>
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
                onPress={() => handleQuantityChange(1)}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>

          </View>
          <TouchableOpacity 
          onPress={()=>handleRemoveCartItem(item)}
          style={{height:30,width:30,backgroundColor:'red',justifyContent:'center',alignItems:'center',borderRadius:50}}>
          <Text style={{color:'yellow'}}>X</Text>
          </TouchableOpacity>
          
        </View>

        <View style={{height: 10, backgroundColor: 'pink'}}></View>
      </View>
    );
  }
  return (
    <FlatList
      data={Items}
      renderItem={CartItem}
      keyExtractor={item => item.id}
    />
  );
}

function Footer({navigation,total}) {
  const [IsSelect, setIsSelect] = useState(false);
  const backgroundColor = IsSelect
    ? {backgroundColor: 'yellow'}
    : {backgroundColor: 'white'};
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: 'pink',
        borderTopWidth: 2,
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setIsSelect(!IsSelect)}
          style={[
            {
              width: 20,
              height: 20,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
              marginLeft: 20,
              alignItems: 'center',
              flexDirection: 'row',
            },
            backgroundColor,
          ]}>
          {IsSelect ? (
            <Image
              source={require('../assets/check.png')}
              resizeMode="stretch"
              style={{height: 20, width: 20}}></Image>
          ) : null}
        </TouchableOpacity>
        <Text>All</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>Tổng tiền:</Text>
        <Text style={{color: 'red'}}>{total} đ</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          alert('San pham');
        }}
        style={{
          width: 100,
          backgroundColor: 'red',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white'}}>MUA</Text>
      </TouchableOpacity>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  box_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  checked: {
    backgroundColor: 'yellow',
  },
  box_back: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-around',
    width: '50%',
  },
  box_chat: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '20%',
    justifyContent: 'space-around',
  },
  headers: {
    flex: 0.8,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'pink',
    borderBottomWidth: 2,
  },
  footer: {
    flex: 0.8,
    backgroundColor: 'white',
  },
  body: {
    flex: 8.4,
    backgroundColor: 'white',
  },
  imgs: {
    height: 30,
    width: 30,
  },
  titleHeader: {
    fontSize: 20,
    color: 'black',
  },
});
export default Cart;

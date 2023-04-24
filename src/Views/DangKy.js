import React, { useState ,useEffect} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import styles from '../style';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({navigation}) => {
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [repass, setrepass] = useState('');
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [phone, setphone] = useState();
   const [count, setcount] = useState(0)

  const CallgetUrl = () => {
    console.log('Calling..Get');
    axios
      .get(URL)
      .then(res => setinfor(res.data))
      .catch(error => console.log(error));
  };

  const [user, setUser] = useState([]); 

  // Lấy danh sách các tài khoản đã đăng ký từ AsyncStorage
  useEffect(() => {
    const getUsers = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@users');
       
        if (jsonValue != null) {
            setUser(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error(e);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const saveUsers = async () => {
      try {
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem('@users', jsonValue);
        
      } catch (e) {
        console.error(e);
      }
    };
    saveUsers();
  }, [user]);

  const handleCheck=()=>{
    if(email==''|| pass ==''|| repass==''||name==""){
      alert('Hãy nhập đủ thông tin')
    }
    else if(pass!=repass){
      alert('Mật Khẩu không Khớp')
    }
    else handleSignup()
   }
  const handleSignup = async () => {
    try {
      
      // Kiểm tra xem email đã được đăng ký trước đó hay chưa
      const existingUser = user.find((user) => user.email === email);
      if (existingUser) {
        alert('Email đã được đăng ký trước đó');
        return;
      }

      // Thêm tài khoản mới vào danh sách và lưu vào AsyncStorage
      user.push({id:count+1, email, pass,name,phone });
      await AsyncStorage.setItem('@users', JSON.stringify(user));
      setcount(count+1)
      alert('Đăng ký thành công');
      setemail(''),setpass(''),setrepass(''),setphone(''),setname('')
    } catch (error) {
      console.log(error);
      alert('Đăng ký không thành công');
    }
  };

//   const handelSubmit = async(email) => {
//     console.log('Calling..GetQuery');
//     try {
//       const res = await axios.get(URL+`?email=${email}`)
//       console.log("res.data= ",res.data);
//       if(JSON.stringify(res.data)=='[]'){
//         Post()
//         setTimeout(() => {
//           navigation.navigate('Login', {IDselected: email})
//         }, 200);
//       }
//       else alert('Email đã tồn tại')
//     } catch (error) {
//         console.log(error)
//     }
//   }

  return (
    <View style={styles.container}>
        {/* <Header/> */}
      <View style={{width: '100%'}}>
        <Item
          title={'Email'}
          value={email}
          onChangeText={setemail}
          keyType="email-address"
        />
        <Item title={'Họ tên'} value={name} onChangeText={setname} />
        <Item
          title={'Mật Khẩu'}
          value={pass}
          onChangeText={setpass}
          secureTextEntry={true}
        />
        <Item
          title={'Nhập lại mật khẩu'}
          value={repass}
          onChangeText={setrepass}
          secureTextEntry={true}
        />
        <Item
          title={'SĐT'}
          value={phone}
          onChangeText={setphone}
          keyType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.btnlog} onPress={()=>handleCheck()}>
        <Text style={{color: 'white', fontSize: 20}}>Đăng ký</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 15,
          flex: 0.3,
        }}>
        <View style={styles.line}></View>
        <Text style={{color:'black'}}>HOẶC</Text>
        <View style={styles.line}></View>
      </View>
      <Bottom />
      <Footer navigation={navigation}/>
    </View>
  );
};
function Header() {
  return (
    <View styles={styles.dau}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/icshop.png')}
          style={styles.logo}
          resizeMode="stretch"></Image>
      </View>
    </View>
  );
}
function Bottom() {
  return (
    <View style={styles.body_down}>
      <TouchableOpacity style={styles.box}>
        <Image
          source={require('../assets/google.png')}
          style={styles.imgs}></Image>
        <View style={styles.center}>
          <Text style={styles.black}>Đăng ký bằng google</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <Image
          source={require('../assets/facebook.png')}
          style={styles.imgs}></Image>
        <View style={styles.center}>
          <Text style={styles.black}>Đăng ký bằng Facebook</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
function Footer({navigation}) {
  return (
    <View style={styles.footer}>
      <Text style={styles.black}>Bạn đã có tài khoản?</Text>
      <TouchableOpacity>
        <Text
          style={styles.blue}
          onPress={() => {
            navigation.goBack();
          }}>
          {' '}
          Đăng nhập
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function Item({title, onChangeText, value, keyType, secureTextEntry}) {
  return (
    <View style={{height: 50, marginHorizontal: 10,borderBottomColor: 'black', borderBottomWidth: 1,marginTop:10,justifyContent:'center'}}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyType}
          secureTextEntry={secureTextEntry}
          placeholder={title}
          placeholderTextColor={'grey'}
          style={{color:'black'}}
        />
    </View>
  );
}

export default SignupScreen

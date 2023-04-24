import {View, Text, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../style';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { isCheckingEmail,isCheckingPass } from './Validation'

const db = firebase.firestore();

const Regiter = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');
  const [repass, setrepass] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState();
  const [error, setError] = useState('');
  

  const handleAddAuth=()=>{
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Dang ky thanh cong');
    })
    .catch(error => {
      console.error(error);
    });
  }
  const handleRegiter = async() => {
    try {
      const querySnapshot = await db.collection('user').where('email', '==', email).get();
      const res = querySnapshot.docs.map(doc => doc.data());
      if(email==''|| password ==''){
        alert('Hãy nhập đủ thông tin')
      }
      else 
      if (isCheckingEmail(email)==false) {
        setError('Email không hợp lệ')
        setemail('')
      }
      else if(password!=repass){
        setError('Mât khẩu không khớp')
        setrepass('')
      }
      else if(password.length<6){
        setError('Mật khẩu phải lớn 6 kí tự')
        setpass('')
        setrepass('')
      }
      else if (isCheckingPass(password)==false){
        alert('Mật khẩu không hợp lệ')
        setpass('')
      } 
      else if(res.length==0){
        console.log('Bat dau dang ky')
        db.collection('user').add({
          email,
          password,
          phone,
          sex:'',
          birth:'',
          role:'user',
      })
      
      .then(() => {
          handleAddAuth()
      })
      .catch((error) => {
          console.error('Error adding document: ', error);
      });
      }
      else {setError('Email đã tồn tại'),setemail('')}
        
    } catch (error) {
      console.error(error)
    }
  }

  const handelSubmit=()=>{
    handleRegiter()
    Alert.alert('Thông báo','Đăng ký thành công',[{text:'Ok',onPress:()=>navigation.navigate('Login')}])
    
  }

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
          value={password}
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
      <Text style={{color:'red'}}>{error}</Text>
      <TouchableOpacity style={styles.btnlog} onPress={()=>handelSubmit()}>
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

export default Regiter;

import {View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import db from '../../db.json'
import {openDatabase} from 'react-native-sqlite-storage'
import SQLite from 'react-native-sqlite-storage'
import axios from 'axios';

const URL = 'http://192.168.47.21:3000/user/' 

const Dnagky = (props) => {

  const [data, setdata] = useState(null)
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [repass, setrepass] = useState('');
  const [name, setname] = useState('');
  const [date, setdate] = useState('');
  const [sex, setsex] = useState(true);
  const [address, setaddress] = useState('');
  const [phone, setphone] = useState(); 

 
  const clearText=()=>{
    setaddress('')
    setemail('')
    setname('')
    setpass('')
    setrepass('')
    setphone('')
  }
  const handelSubmit = async () =>{
   try {
    const res = await axios.put(URL,{
      email:email,
      password:pass,
      name:name,
      phone:date,
    }
    )
    setdata(res.data)
    console.log("old",data)
    clearText()
   } catch (error) {
    Alert.alert(error)
   }
   
}

  return (
    <View style={{flex: 1}}>
      <Item title={'email'} value={email} onChangeText={setemail} />
      <Item title={'password'} value={pass} onChangeText={setpass} />
      <Item title={'repass'} value={repass} onChangeText={setrepass} />
      <Item title={'address'} value={address} onChangeText={setaddress} />
      <Item title={'phone'} value={phone} onChangeText={setphone} />
      <View style={{height:40,width:'100%',alignItems:'center'}}>
      <TouchableOpacity style={{backgroundColor:'red',height:40,width:50}} onPress={()=>handelSubmit()}>
        <Text>Sub</Text>
      </TouchableOpacity>
      <ScrollView>
        <Text>{JSON.stringify(data)}</Text>
      </ScrollView>
      </View>
    </View>
  );
};

function Item({title,onChangeText,value}) {

  return (
    <View style={{height: 80, marginHorizontal: 10}}>
      <Text>{title}</Text>
      <View style={{height: 40, borderColor: 'black', borderWidth: 1}}>
        <TextInput value={value} onChangeText={onChangeText} />
      </View>
    </View>
  );
}

export default Dnagky;

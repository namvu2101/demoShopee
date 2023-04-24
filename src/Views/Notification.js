import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notification = () => {
  
const [data, setdata] = useState('')
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
   
  
    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'blue'}}>
   
          <Text style={{fontSize:40,color:'white'}}>DATA:{data}</Text>
     
          
        </View>
      )
    }

export default Notification
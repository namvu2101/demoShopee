import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Setting = ({navigation}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;

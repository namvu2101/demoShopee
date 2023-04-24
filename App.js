import { View, Text ,Image,TextInput,TouchableOpacity} from 'react-native'
import React,{ useState } from 'react'
import styles from './src/style'


const App = () => {
  const [emailValue, setemailValue] = useState('');
  const [passValue, setpassValue] = useState('');
  const [sercurePass, setsercurePass] = useState(true);

  return (
    <View style={{justifyContent:'center',flex:1}}>
   <View style={styles.body_up}>
      <View style={styles.boxinput}>
       
        <View>
          <TextInput
            value={emailValue}
            onChangeText={text => {
              setErrEmail(isCheckingEmail(text) ? 'ok' : 'Email khong hop le');
              setemailValue(text);
            }}
            style={styles.input}
            placeholderTextColor={'grey'}
            placeholder="Email/Số điện thoại/Tên tài khoản"></TextInput>
        </View>
      </View>
      <View style={styles.boxinput}>
        
        <View style={styles.box_pass}>
          <TextInput
            value={passValue}
            onChangeText={text => {
              setErrPass(isCheckingPass(text)? '' : 'Password khong hop le');
              setpassValue(text);
            }}
            style={[styles.input, styles.setWidth]}
            placeholder="Mật khẩu"
            placeholderTextColor={'grey'}
            secureTextEntry={sercurePass}></TextInput>
          <TouchableOpacity
            onPress={() => {
              setsercurePass(!sercurePass);
              // seteyepass('../assets/close-eye.png');
            }}>
            {sercurePass ? (
              <Image
                source={require('./src/assets/close-eye.png')}
                style={styles.imgs}></Image>
            ) : (
              <Image
                source={require('./src/assets/eye.png')}
                style={styles.imgs}></Image>
            )}
          </TouchableOpacity>

          <View
            style={{
              height: 20,
              width: 1,
              backgroundColor: 'black',
              marginHorizontal: 10,
            }}></View>
          <View>
            <TouchableOpacity>
              <Text style={styles.blue}>Quên?</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </View>
      <TouchableOpacity
       
        onPress={() => {
          
        }}>
      <View style={styles.btnlog}>
      <Text style={{color: 'white', fontSize: 20}}>Đăng Nhập</Text>
    </View>
      </TouchableOpacity>
    </View>
      
    </View>
  )
}

export default App
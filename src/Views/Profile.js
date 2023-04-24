import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateAccountName} from '../redux/actions/Update';
import DatePicker from 'react-native-date-picker';

function Profile({navigation}) {
  //   const {Name} = route.params;
  // console.log(Name);

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const info = useSelector(state => state.personalInfo);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.3, backgroundColor: 'red'}}>
        <Header navigation={navigation} />
        <Avatar />
      </View>
      {/* <Body navigation={navigation} accname={info.accountName} /> */}
      <View style={{flex: 0.7}}>

        <Item
          name={'Tên'}
          title={''}
          onPress={() => navigation.navigate('Update')}
        />
        <Item
          name={'Giới Tính'}
          title={''}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
        <View style={{height: 10, backgroundColor: 'pink'}}></View>
        <Item
          name={'Bio'}
          title={''}
          onPress={() => {
            Alert.alert('onpress');
          }}
        />
        <Item
          name={'Ngày sinh'}
          title={[date.getDate(),'/',date.getMonth()+1,'/',date.getFullYear()]}
          onPress={() => {
            setOpen(true);
          }}
        />
        <View style={{height: 10, backgroundColor: 'pink'}}></View>
        <Item
          name={'Liên kết ngân hàng'}
          title={''}
          onPress={() => {
            Alert.alert('onpress');
          }}
        />
      </View>
      <ViewModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <DatePicker
       locale='en_ZA'
        modal
        open={open}
        date={date}
        mode="date"
        title={'Chọn Ngày'}
        confirmText="Hoàn Thành"
        cancelText="Hủy"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
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
}
// function ViewProfile({navigation,route}) {
//   return (
//     <View style={{flex: 1}}>
//       <View style={{flex: 0.3, backgroundColor: 'red'}}>
//         <Header navigation={navigation}/>
//         <Avatar />
//       </View>
//       <Body navigation={navigation} />
//     </View>
//   );
// }

function Avatar({navigation}) {
  return (
    <TouchableOpacity style={{height: '75%', justifyContent: 'flex-end'}}>
      <Image
        source={require('../assets/background.jpg')}
        style={{height: '100%', width: '100%'}}
        resizeMode="stretch"></Image>

      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}>
        <TouchableOpacity
          style={{
            height: 65,
            width: 65,
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <Image
            source={require('../assets/avatar.jpg')}
            style={{height: '100%', width: '100%', borderRadius: 50}}
            resizeMode="cover"></Image>
          <View
            style={{
              height: '50%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              position: 'absolute',
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}>
            <Text>Sửa</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 20,
          backgroundColor: 'pink',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'absolute',
        }}>
        <Text>Chạm để thay đổi</Text>
      </View>
    </TouchableOpacity>
  );
}

function Header({navigation}) {
  return (
    <View
      style={{
        height: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          justifyContent: 'space-around',
          width: '40%',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/back.png')}
            style={{height: 30, width: 30}}></Image>
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'black'}}>Sửa hồ sơ</Text>
      </View>
      <TouchableOpacity>
        <Image
          source={require('../assets/check.png')}
          style={{height: 30, width: 30}}></Image>
      </TouchableOpacity>
    </View>
  );
}

export function UpdateName({navigation}) {
  const info = useSelector(state => state.personalInfo);

  const dispatch = useDispatch();
  // const {Myname} = route.params;
  const [updateName, setupdateName] = useState(info.accountName);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: 'white',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            justifyContent: 'space-around',
            width: '40%',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/back.png')}
              style={{height: 30, width: 30}}></Image>
          </TouchableOpacity>

          <Text style={{fontSize: 20, color: 'black'}}>Sửa tên</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(updateAccountName(updateName));
            //  console.log('Name: ',updateName);
            //  console.log('cap nhat thanh cong',info);
          }}>
          <Image
            source={require('../assets/check.png')}
            style={{height: 30, width: 30}}></Image>
        </TouchableOpacity>
      </View>
      <View style={{height: 5, backgroundColor: 'pink'}}></View>
      <View style={{height: 50, borderColor: 'black', borderWidth: 0.5}}>
        <TextInput
          value={updateName}
          onChangeText={text => setupdateName(text)}></TextInput>
        <Text>Name: {info.accountName}</Text>
      </View>
    </View>
  );
}

function Item({title, name, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: 'white',
      }}>
      <Text>{name}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text>{title}</Text>
        <Image
          source={require('../assets/next.png')}
          style={{height: 20, width: 20}}></Image>
      </View>
    </TouchableOpacity>
  );
}

// function Body({navigation, accname}) {
//   return (
//     <View style={{flex: 0.7}}>
//       {data.map((item, index) => (
//         <View key={item.id}>
//           {index == 2 ? (
//             <View style={{height: 10, backgroundColor: 'pink'}}></View>
//           ) : index == 4 ? (
//             <View style={{height: 10, backgroundColor: 'pink'}}></View>
//           ) : null}

//           <TouchableOpacity
//             onPress={() => navigation.navigate('Update')}
//             style={{
//               height: 50,
//               borderBottomColor: 'black',
//               borderBottomWidth: 1,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               paddingHorizontal: 10,
//               backgroundColor: 'white',
//             }}>
//             <Text>{item.name}</Text>
//             <View style={{flexDirection: 'row'}}>
//               {index == 0 ? <Text>{accname}</Text> : <Text>{item.title}</Text>}
//               <Image
//                 source={require('../assets/next.png')}
//                 style={{height: 20, width: 20}}></Image>
//             </View>
//           </TouchableOpacity>
//         </View>
//       ))}
//     </View>
//   );
// }

function ViewModal({modalVisible, setModalVisible}) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.box_modal}>
        <View style={styles.modal}>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.closeText}>Giới Tính</Text>
            </View>
            <TouchableOpacity
              style={styles.sex}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sex}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Nữ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sex}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Khác</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function ViewDate({DateVisible, setDateVisible}) {
  const [date, setDate] = useState(new Date());
  return (
    <Modal animationType="slide" transparent={true} visible={DateVisible}>
      <View style={styles.box_modal}>
        <View style={styles.modal}>
          <View style={{flex: 1}}>
            {/* <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.closeText}>Chọn Ngày</Text>
            </View> */}

            <DatePicker
              modal
              open={DateVisible}
              date={date}
              onConfirm={date => {
                setDateVisible(true);
                setDate(date);
              }}
              onCancel={() => {
                setDateVisible(true);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    height: 200,
    width: 300,
  },
  closeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  box_modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sex: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
});
const data = [
  {
    id: '1',
    name: 'Tên',
    title: 'name',
    onPress: 'Update',
  },
  {
    id: '2',
    name: 'Bio',
    title: '',
  },
  {
    id: '3',
    name: 'Giới Tính',
    onPress: '',
  },
  {
    id: '4',
    name: 'Ngày sinh',
    title: '',
  },
  {
    id: '5',
    name: 'Tài khoản liên kết',
    title: '',
  },
];
export default Profile;

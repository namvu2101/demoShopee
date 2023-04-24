import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  Dimensions,
  Animated,
  useWindowDimensions,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import styles from './style';
import Swiper from 'react-native-swiper';
import db from '../../db.json'  
import {
  listBanner,
  dataDanhmuc,
  dataDanhmuc2,
  dataFlashSale,
  dataIcon,
  dataIcon2,
  dataSF,
  listGoiy,
  listSP,
  listThoitrang,
  listSP2,
  Bigdata,
  dataHomePd,
} from './Data';

const {width} = Dimensions.get('window');
const {height: screenHeight} = Dimensions.get('window');

const Home = ({navigation,route}) => {
  

  const [selectedId, setSelectedId] = useState('1');
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    setScrollY(y);
}
  return (
    <View style={styles.container}>
      <ScrollView onScroll={handleScroll}>
        {/* {Banner} */}
        {/* <View style={{height: 200}}>
          <Banner stepScrol={stepScrol} />
        </View> */}
        <Banner />

        <View style={styles.below_header}>
          <View style={styles.scaner_box}>
            <View style={{width: '16%', alignItems: 'center'}}>
              <Image
                source={require('../assets/scanner.png')}
                style={styles.imgs}></Image>
            </View>
            <View
              style={{
                width: '42%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderLeftColor: 'red',
                borderRightColor: 'red',
                borderRightWidth: 1,
                borderLeftWidth: 1,
                height: 40,
              }}>
              <Image
                source={require('../assets/scanner.png')}
                style={styles.imgs}></Image>
              <TextInput>Shopee Pay</TextInput>
            </View>
            <View
              style={{
                width: '42%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
              }}>
              <Image
                source={require('../assets/scanner.png')}
                style={styles.imgs}></Image>
              <TextInput>Shopee Pay</TextInput>
            </View>
          </View>
        </View>

        {/* {List Icon} */}

        <View
          style={{
            height: 150,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ScrollView horizontal>
            <ListIcon />
          </ScrollView>
        </View>

        {/* {----} */}
        <View
          style={{
            borderColor: 'red',
            borderWidth: 2,
            height: 100,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Image</Text>
        </View>

        {/* {Flash Sale} */}

        <View
          style={{
            width: '100%',
            height: 200,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
            }}>
            <Text>Flash Sale</Text>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Text>Xem tat ca</Text>
              <Image
                source={require('../assets/next.png')}
                style={styles.imgs}></Image>
            </TouchableOpacity>
          </View>
          <ListFlashSale />
        </View>

        <View style={{height: 10, backgroundColor: 'pink'}}></View>
        {/* {Search First} */}

        <View style={{height: 200, backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
            }}>
            <Text>Tim kiem hang dau</Text>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Text>Xem tat ca</Text>
              <Image
                source={require('../assets/next.png')}
                style={styles.imgs}></Image>
            </TouchableOpacity>
          </View>
          <ListSF />
        </View>

        <View style={{height: 10, backgroundColor: 'pink'}}></View>

        {/* {Danh muc} */}

        <View style={{height: 320, width: '100%', backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
            }}>
            <Text>Danh muc</Text>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Text>Xem tat ca</Text>
              <Image
                source={require('../assets/next.png')}
                style={styles.imgs}></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{height: '90%', width: '100%', backgroundColor: 'white'}}>
            <ScrollView horizontal>
              <ListDanhmuc navigation={navigation} />
            </ScrollView>
          </View>
        </View>

        <View style={{height: 10, backgroundColor: 'pink'}}></View>

        {/* {Goi y} */}

        <View>
          <View style={{height: 40}}>
            <Text>Goi y hom nay</Text>
          </View>
          <View style={{height: 80, backgroundColor: 'pink'}}>
            <ListGoiy selectedId={selectedId} setSelectedId={setSelectedId} />
          </View>

          {dataHomePd.map(item =>
            selectedId == item.id ? (
              <View key={item.id}>
                <ListProduct
                  navigation={navigation}
                  dataleft={item.dataleft}
                  dataRight={item.dataRight}
                />
              </View>
            ) : null,
          )}
        </View>
      </ScrollView>
      <View style={[styles.top_header,scrollY >=200 ? {backgroundColor:'white'}: null]}>
      <Search navigation={navigation} scrollY={scrollY}/>
      </View>
    </View>
  );
};

// function Banner() {
//   const [scrollIndex, setScrollIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setScrollIndex(scrollIndex =>
//         scrollIndex === listBanner.length - 1 ? 0 : scrollIndex + 1,
//       );
//     }, 2500);

//     return () => clearInterval(interval);
//   }, []);

//   return (

//       <View style ={{height:200}}>
//         <ScrollView
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onMomentumScrollEnd={event => {
//             const slideIndex = Math.round(
//               event.nativeEvent.contentOffset.x / width,
//             );
//             setScrollIndex(slideIndex);
//           }}>
//           {listBanner.map((image, index) => (
//             <View key={index}>
//             {scrollIndex === index ?
//             <Image
//               key={index}
//               source={image.photo}
//               style={{height:'100%',width:width}}
//               resizeMode="stretch"
//             /> : null
//             }</View>
//           ))}
//         </ScrollView>

//         <View style={styles.dotContainer}>
//           {listBanner.map((_, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.dot,
//                 {backgroundColor: scrollIndex === index ? 'white' : '#ccc'},
//               ]}
//             />
//           ))}
//         </View>
//       </View>

//   );
// };

function Banner() {
  return (
    <View style={{height: 200, width: '100%'}}>
      <Swiper
        dotStyle={{height: 5, width: 5, borderRadius: 10}}
        activeDotColor="red"
        dotColor="white"
        autoplay={true}
        autoplayTimeout={4}
        showsButtons={false}>
        {db.banner.map(item => (
          <View key={item.id}>
            <Image
              source={{uri:item.photo}}
              resizeMode="stretch"
              style={{height: '100%', width: '100%'}}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
}

function Search({navigation}) {
  return (
    
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.boxsearch}>
          <Image
            source={require('../assets/search.png')}
            style={styles.imgs}></Image>
          <TextInput
            style={{
              width: '80%',
            }}
            placeholder="Search"></TextInput>
          <View>
            <TouchableOpacity>
              <Image
                source={require('../assets/camera.png')}
                style={styles.imgs}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '20%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image
              source={require('../assets/shopping-cart.png')}
              style={styles.imgs}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/bubble-chat.png')}
              style={styles.imgs}></Image>
          </TouchableOpacity>
        </View>
      </View>

  );
}

function ListIcon() {
  return (
    <View
      style={{
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '100%',
      }}>
      <View style={{flexDirection: 'row'}}>
        {db.Icon.map((item, index) => (
          <TouchableOpacity key={item.id}>
            <View style={styles.box_icon}>
              <Image source={item.photo} style={styles.logo} />
              <Text style={{fontSize: 10}} numberOfLines={1}> {item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{flexDirection: 'row'}}>
        {db.Icon2.map(item => (
          <TouchableOpacity key={item.id}>
            <View style={styles.box_icon}>
              <Image source={item.photo} style={styles.logo} />
              <Text style={{fontSize: 10}}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function ListFlashSale() {
  return (
    <FlatList
      horizontal={true}
      data={dataFlashSale}
      renderItem={({item}) => (
        <View
          style={{
            height: 150,
            width: 100,
            backgroundColor: 'white',
            marginHorizontal: 5,
            alignItems: 'center',
          }}>
          <Image
            source={item.photo}
            style={{height: 100, width: 100}}
            resizeMode="stretch"></Image>
          <Text>{item.price}</Text>
        </View>
      )}
      keyExtractor={item => item.id}></FlatList>
  );
}

function ListSF() {
  return (
    <FlatList
      horizontal={true}
      data={dataSF}
      renderItem={({item}) => (
        <View
          style={{
            height: 150,
            width: 100,
            backgroundColor: 'white',
            marginHorizontal: 5,
            alignItems: 'center',
          }}>
          <Image
            source={item.photo}
            style={{height: 100, width: 100}}
            resizeMode="stretch"></Image>
          <Text>{item.name}</Text>
        </View>
      )}
      keyExtractor={item => item.id}></FlatList>
  );
}
function ListDanhmuc({navigation}) {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        {db.Danhmuc.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('Mall', {IDselected: item.name})}>
            <View
              style={{
                height: 120,
                width: 120,
                alignItems: 'center',
                backgroundColor: 'white',
                marginBottom: 10,
              }}>
              <Image
                source={{uri:item.photo}}
                style={styles.banner}
                resizeMode="stretch"></Image>
              <Text style={{fontSize: 10}}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{flexDirection: 'row'}}>
        {db.Danhmuc2.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('Mall', {IDselected: item.name})}>
            <View
              style={{
                height: 120,
                width: 120,
                alignItems: 'center',
                backgroundColor: 'white',
                marginVertical: 5,
              }}>
              <Image
                source={{uri:item.photo}}
                style={styles.banner}
                resizeMode="stretch"></Image>
              <Text style={{fontSize: 10}}> {item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function ListGoiy({selectedId, setSelectedId}) {
  function renderItem({item, index}) {
    const boder = item.id === selectedId ? 'red' : 'pink';
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedId(item.id);
        }}>
        <View
          style={[
            {
              backgroundColor: 'white',
              marginHorizontal: 2,
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: 70,
              borderWidth: 2,
              borderColor: boder,
            },
          ]}>
           
          <Image source={item.photo} style={styles.logo}></Image>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <FlatList
      horizontal
      data={db.listGoiy}
      renderItem={renderItem}
      keyExtractor={item => item.id}></FlatList>
  );
}

function ListProduct({dataleft, dataRight, navigation}) {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{width: '50%'}}>
        {dataleft.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.view_product}
            onPress={() => navigation.navigate('Product')}>
            <View style={{height: 180, width: '100%'}}>
              <Image
                source={item.photo}
                style={{height: '100%', width: '100%'}}
                resizeMode="stretch"></Image>
            </View>
            <View style={{backgroundColor: 'red'}}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{width: '50%'}}>
        {dataRight.map(item => (
          <TouchableOpacity key={item.id} style={styles.view_product}>
            <View style={{height: 180, width: '100%'}}>
              <Image
                source={item.photo}
                style={{height: '100%', width: '100%'}}
                resizeMode="stretch"></Image>
            </View>
            <View style={{backgroundColor: 'red'}}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function ListView({data}) {
  function renderItem(item) {
    return (
      <View style={styles.itemList}>
        <Image
          source={item.item.photo}
          style={styles.photo}
          resizeMode="stretch"
        />
        <View style={styles.listTitle}>
          <Text numberOfLines={2} style={styles.txtName}>
            {item.item.name}
          </Text>
          <Text style={styles.txtPrice}>{item.item.price} đ</Text>
          <Text style={styles.txtAdd}>{item.item.add}</Text>
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
      }}>
      <View style={{width: '50%', flex: 1}}>
        <FlatList
          data={dataDanhmuc}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

export default Home;

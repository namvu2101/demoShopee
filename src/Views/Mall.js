import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import db from '../../db.json';

const Mall = ({route, navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('Quần áo Nam'); // State để lưu trữ category được chọn
  const filteredProducts = db.ProDuct.filter(
    ProDuct => ProDuct.category === selectedCategory,
  ); // Lọc danh sách sản phẩm dựa trên category được chọn

  
  useEffect(() => {
    if (!route.params) {
      setSelectedCategory('Quần áo Nam');
    } else {
      setSelectedCategory(route.params.IDselected);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Search onPress={() => navigation.navigate('Cart')} />
      </View>

      {/* LIST_CATERY */}
      {/* Hiển thị danh sách các category */}
      <View style={styles.caterys}>
        <Categories
          isSelected={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>

      {/* TITLE */}

      <View style={{alignItems: 'center', marginBottom: 5}}>
        <Text>{selectedCategory}</Text>
      </View>

      {/* LIST_VIEW */}
      <View style={styles.listView}>
        {/* Hiển thị danh sách sản phẩm */}
        <ListView data={filteredProducts} navigation={navigation}/>
      </View>
    </View>
  );
};

function Search({onPress}) {
  return (
    <View style={styles.search}>
      <View style={styles.boxsearch}>
        <Image
          source={require('../assets/search.png')}
          style={styles.imgs}></Image>
        <TextInput style={styles.txtInput} placeholder="Search"></TextInput>
      </View>
      <View style={styles.iconHeader}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../assets/shopping-cart.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
        <Image
          source={require('../assets/bubble-chat.png')}
          style={styles.imgs}></Image>
      </View>
    </View>
  );
}

function Categories({isSelected, setSelectedCategory}) {
  const handleCategoryPress = (category) => {
   
    setSelectedCategory(category);
    // Cập nhật category được chọn trong state
  };
  const Render = item => {
    const bodercl =
      item.item.name === isSelected
        ? {borderColor: 'red'}
        : {borderColor: 'white'};
    return (
      <TouchableOpacity
        style={[styles.item, bodercl]}
        onPress={() => {
          handleCategoryPress(item.item.name);
        }}
        disabled={isSelected == item.item.name ? true : false}>
        <Image
          source={item.item.photo}
          style={styles.image}
          resizeMode="stretch"></Image>
        <Text style={{fontSize: 10, textAlign: 'center'}}>
          {item.item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      horizontal
      data={db.CategoriesList}
      renderItem={Render}
      keyExtractor={item => item.id}></FlatList>
  );
}

function ListView({data,navigation}) {

const handelProduct=(id)=>{
  navigation.navigate('Product',{IDProduct:id})
  
}

  function renderItem(item) {
    return (
      <TouchableOpacity style={styles.itemList} onPress={()=>handelProduct(item.item.id)}> 
        <Image
          source={{uri:item.item.photo}}
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
      </TouchableOpacity>
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
          numColumns={2}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  caterys: {
    flex: 2,
    marginVertical: 10,
    backgroundColor: 'pink',
  },
  iconHeader: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photo: {
    height: 180,
    width: '100%',
  },
  listTitle: {marginHorizontal: 5, justifyContent: 'center'},
  txtPrice: {
    color: 'red',
    fontSize: 18,
  },
  txtName: {
    color: 'black',
  },
  txtAdd: {
    fontSize: 14,
  },
  listView: {
    flex: 9,
    backgroundColor: '#2144',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemList: {
    height: 280,
    width: '45%',
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'flex-start',
  },
  boxsearch: {
    height: '90%',
    width: '75%',
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  txtInput: {
    marginHorizontal: 5,
  },
  imgs: {
    height: 25,
    width: 25,
    marginHorizontal: 5,
  },
  item: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 2,
    marginVertical: 2,
    justifyContent: 'center',
    height: '95%',
    width: 80,
    borderWidth: 2,
  },
  image: {
    height: 70,
    width: 70,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '95%',
  },
});

export default Mall;

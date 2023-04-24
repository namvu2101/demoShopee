import React, { useState,useEffect } from 'react';
import { ScrollView, Text ,FlatList, Vibration, View} from 'react-native';
import Todo from './Todo';
import firestore from '@react-native-firebase/firestore';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { firebase } from '@react-native-firebase/auth';

function Todos() {
  const [ todo, setTodo ] = useState('');
  const [ loading, setLoading ] = useState(true);
  const [ todos, setTodos ] = useState([]);
  const ref = firestore().collection('todos')
  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        return null; 
      }
    });
  }, []);

  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }
  return (
    <>
      <Appbar>
        <Appbar.Content title={'TODOs List'} />
      </Appbar>
      <FlatList
        style={{flex: 1}}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View></View>}
      />
      <ScrollView style={{flex: 1}}>
        <Text>List of TODOs!</Text>
      </ScrollView>
      <TextInput label={'New Todo'} value={todo} onChangeText={setTodo} />
      <Button onPress={() => addTodo()}>Add TODO</Button>
    </>
  );
}

export default Todos
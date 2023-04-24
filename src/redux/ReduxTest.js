import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

// Actions
const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

// Action creators
const requestData = () => {
  return {
    type: FETCH_DATA_REQUEST,
  }
}

const receiveData = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  }
}

const receiveError = () => {
  return {
    type: FETCH_DATA_ERROR,
  }
}

// Reducer
const initialState = {
  loading: false,
  data: null,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }
    default:
      return state;
  }
}

// Thunk
const fetchData = () => {
  return (dispatch) => {
    dispatch(requestData());
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(json => dispatch(receiveData(json)))
      .catch(() => dispatch(receiveError()))
  }
}

// Component
class App extends Component {

  render() {
    const { loading, data, error, fetchData } = this.props;
    
    return (
      <View>
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error fetching data</Text>}
        {data && <Text>{data.title}</Text>}
        <Button title="Fetch data" onPress={fetchData} />
      </View>
    )
  }
}

// Connect component to store
const ConnectedApp = connect(
  state => ({
    loading: state.loading,
    data: state.data,
    error: state.error,
  }),
  dispatch => ({
    fetchData: () => dispatch(fetchData()),
  })
)(App);

// Create store with middleware
const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

// Render app
export default function() {
  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  )
}

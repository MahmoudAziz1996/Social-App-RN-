import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import firebase from 'firebase'
import Navigator from './src/Routes/RootNav'
import Reducers from './src/Reducers'
export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp(
      {
        apiKey: "AIzaSyARzzn3HMOaZLwW6sPs6vWlxGMmExsDbCY",
        authDomain: "minisocial-95c9d.firebaseapp.com",
        databaseURL: "https://minisocial-95c9d.firebaseio.com",
        projectId: "minisocial-95c9d",
        storageBucket: "minisocial-95c9d.appspot.com",
        messagingSenderId: "695559222679",
        appId: "1:695559222679:web:7df00e77f17b6046"
      }
    );
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <StatusBar backgroundColor="#0063A6" barStyle="light-content" />
        <Provider store={createStore(Reducers,{},applyMiddleware(ReduxThunk))}>
          <Navigator />
        </Provider>
      </View>
    );
  }
}

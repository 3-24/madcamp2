import React, { Component } from 'react';
import Router from "./app/Router";
import { Text, View, Dimensions, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator} from 'react-navigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStack from './app/TabMaster'

const App = () => {
  return (
    <AppStack/>
  )
}

class MainActivity extends Component{
  static navigationOptions={
    title:'밤편지',
    headerStyle:{
      backgroundColor: 'green'
    },
    headerTintColor: '#fff',
  }
}
export default App;
import React, { Component } from 'react';
import AppStack from './TabMaster'

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
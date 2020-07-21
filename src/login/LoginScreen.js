import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Text, ImageBackground, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../register/SignUp';
var login_background = require('../../asset/login_background.jpg')
class LoginComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
      }
    }

    handleSubmit = function(){
      const {email, password} = this.state;
      fetch('http://192.249.19.244:1380/anon_signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then((response)=>response.json())
      .then((json)=>{
        this.state.code = json.code;
        if(this.state.code === 200){
          this.props.changeEmail(email);
          this.props.handler(true);
        }
        else alert("Check ID and password");
      })
    }
    
    render(){
    return(
      <ImageBackground source = {login_background} style={{height:'100%', width: '100%', justifyContent: 'center'}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TextInput style={styles.inputbox} 
          placeholderTextColor='#000'
          placeholder="이메일" 
          autoCapitalize='none'
          onChangeText={(input)=>this.setState({email:input})}/>
          <TextInput secureTextEntry={true}
            style={styles.inputbox}
            placeholderTextColor='#000'
            placeholder="비밀번호"
            autoCapitalize='none'
            onChangeText={(input)=>this.setState({password: input})}/>
            <View style={{flexDirection: 'row', justifyContent:'center'}}>
              <TouchableOpacity style={{backgroundColor: '#00000080', width: "43.5%", padding: 5, alignItems: 'center', marginTop: 10, marginRight: 10}} onPress={() => this.handleSubmit()} >
                <Text style={{fontSize: 15, alignItems: 'center', color: '#fff'}}>로그인</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: '#00000080', width: "43.5%", padding: 5, alignItems: 'center', marginTop: 10}} onPress={() => this.props.navigation.navigate('Register')} >
                <Text style={{fontSize: 15, alignItems: 'center', color: '#fff'}}>회원가입</Text>
              </TouchableOpacity>
            </View>
        </View>
        <StatusBar barStyle ="light-content" hidden = {false} backgroundColor = '#07111d'/>
      </ImageBackground>
    );
    }
}

const Stack = createStackNavigator();

class StartUp extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{ title: '로그인', headerStyle:{ backgroundColor: '#07111d' }, headerTitleStyle:{fontWeight: 'bold', color: '#fff'}}}>
            {(props)=><LoginComponent  navigation={props.navigation} changeEmail={this.props.changeEmail} handler={this.props.handler}/>}
            </Stack.Screen>
          <Stack.Screen name="Register" component={SignUp}options={{ title: '회원가입', headerStyle:{ backgroundColor: '#07111d' }, headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold', color: '#fff'}}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        alignItems: 'center',
        flex:1,
        justifyContent: 'center',
        alignItems:'stretch',
        padding: 10,
    },
    inputbox : {
        width: "100%",
        borderColor: '#323c57',
        backgroundColor: '#fff',
        opacity: 0.3,
        borderWidth: 2,
        paddingLeft: 10,
        width: "90%"
    },
    button : {
        backgroundColor: "#DDDDDD",
        alignItems: 'center',
        marginVertical: 10,
        padding:10
    }
})

export default StartUp;
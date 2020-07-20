import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../register/SignUp';

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
      fetch('http://192.249.19.242:8480/anon_signin', {
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
          this.props.handler(true);
        }
        else alert("Check ID and password");
      })
    }
    
    render(){
    return(
      <View style={styles.container}>
        <TextInput style={styles.inputbox} placeholder="Email" onChangeText={(input)=>this.setState({email:input})}/>
        <TextInput secureTextEntry={true}
          style={styles.inputbox}
          placeholder="password"
          onChangeText={(input)=>this.setState({password: input})}/>
        <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit()} >
          <Text>LOGIN!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Register')} >
          <Text>REGISTER</Text>
        </TouchableOpacity>
      </View>
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
            <Stack.Screen name="Login">
            {()=><LoginComponent handler={this.props.handler}/>}
            </Stack.Screen>
          <Stack.Screen name="Register" component={SignUp}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        flex:1,
        justifyContent: 'center',
        alignItems:'stretch',
        padding: 10,
    },
    inputbox : {
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
    },
    button : {
        backgroundColor: "#DDDDDD",
        alignItems: 'center',
        marginVertical: 10,
        padding:10
    }
})

export default StartUp;
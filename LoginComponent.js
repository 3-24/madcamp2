import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';
import SignUp from './SignUp';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';


class LoginComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pushData: [],
        loggedIn: false
      }
    }

    componentDidMount() {
      GoogleSignin.configure({
        webClientId: "690743107079-mtcoqcq0maoh8kl4gun0es6pi7hcaiil.apps.googleusercontent.com", // client ID of type WEB for your server(needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        accountName: '', // [Android] specifies an account name on the device that should be used
            });
    }

    _signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        this.setState({ userInfo: userInfo, loggedIn: true });
        console.log(userInfo);

      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    };
    
    render(){
    return(
            <View style={styles.container}>
            <TextInput style={styles.inputbox} placeholder="ID"/>
            <TextInput style={styles.inputbox} placeholder="password"/>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Main')} >
            <Text>LOGIN!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Register')} >
            <Text>REGISTER</Text>
            </TouchableOpacity>
            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this._signIn}
              disabled={this.state.isSigninInProgress} />
            </View>
    );
    }
}

const Stack = createStackNavigator();

function StartUp() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PreLogin">
          <Stack.Screen name="Login" component={LoginComponent} />
          <Stack.Screen name="Main" component={App}/>
          <Stack.Screen name="Register" component={SignUp}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
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
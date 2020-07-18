import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';
import SignUp from './SignUp';
import auth from '@react-native-firebase/auth';




// function LoginComponent() {
//   // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) return null;

//   if (!user) {
//     return (
//       <View>
//         <Text>Login</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       <Text>Welcome {user.email}</Text>
//     </View>
//   );
// }


class LoginComponent extends Component {

    constructor(props) {
      super(props);
      this.state={
        email: '',
        password: ''
      };
    }

    render(){
      function login(state, nav){
        auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then(() => {
          nav.navigate('Main')
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });
      }
    return(
      <View style={styles.container}>
        <TextInput style={styles.inputbox} placeholder="Email" onChangeText={(input)=>this.setState({email:input})}/>
        <TextInput style={styles.inputbox} placeholder="Password" onChangeText={(input)=>this.setState({password:input})}/>
        <TouchableOpacity style={styles.button} onPress={()=>login(this.state, this.props.navigation)} >
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
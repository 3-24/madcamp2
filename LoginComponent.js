import React from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';

function LoginComponent({navigation}) {
    return(
            <View style={styles.container}>
            <TextInput style={styles.inputbox} placeholder="ID"/>
            <TextInput style={styles.inputbox} placeholder="password"/>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')} >
            <Text>LOGIN!</Text>
            </TouchableOpacity>
            </View>
    );
}

const Stack = createStackNavigator();

function StartUp() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PreLogin">
          <Stack.Screen name="Login" component={LoginComponent} />
          <Stack.Screen name="Main" component={App}/>
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
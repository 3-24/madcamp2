import React from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Text } from 'react-native';

class LoginComponent extends React.Component {
    render(){
        return <View style={styles.container}>
            <TextInput style={styles.inputbox} placeholder="ID"/>
            <TextInput style={styles.inputbox} placeholder="password"/>
            <TouchableOpacity style={styles.button} >
            <Text>LOGIN!</Text>
            </TouchableOpacity>
            </View>
            ;
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

export default LoginComponent;
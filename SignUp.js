import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function SignUp() {
    return (
        <View style={styles.container}>
            <Text style={styles.textentry}>Username</Text>
            <TextInput style={styles.inputbox}/>
            <Text style={styles.textentry}>Password</Text>
            <TextInput secureTextEntry={true} style={styles.inputbox}/>
            <Text style={styles.textentry}>Retype password</Text>
            <TextInput secureTextEntry={true} style={styles.inputbox}/>
            <Text style={styles.textentry}>Email</Text>
            <TextInput style={styles.inputbox}/>
            <TouchableOpacity style={styles.button}>
                <Text>REGISTER!</Text>
            </TouchableOpacity>
        </View>
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
    textentry : {
        fontFamily: "Cochin",
        fontSize: 20
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


export default SignUp;
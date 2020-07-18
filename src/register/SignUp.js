import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

function handleSubmit(state){
    const {email, password, confirmPassword } = state;
    if (password !== confirmPassword) {alert("Passwords don't match");}
    else {
        
    }
}

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.textentry}>Email</Text>
                <TextInput style={styles.inputbox} onChangeText={(input)=>this.setState({email:input})}/>
                <Text style={styles.textentry}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.inputbox} onChangeText={(input)=>this.setState({password: input})}/>
                <Text style={styles.textentry}>Confirm Password</Text>
                <TextInput secureTextEntry={true} style={styles.inputbox} onChangeText={(input)=>this.setState({confirmPassword: input})}/>
                <TouchableOpacity style={styles.button} onPress={()=>handleSubmit(this.state)} >
                    <Text>REGISTER!</Text>
                </TouchableOpacity>
            </View>
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
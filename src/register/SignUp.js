import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';

var login_background = require('../../asset/login_background.jpg')

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
        };
    }


    handleSubmit = async function(){
        const {email, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {alert("Passwords don't match");}
        else {
            return fetch('http://192.249.19.244:1380/anon_signup', {
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
              .then((response) => response.json())
              .then((json)=>{
                  this.state.code=json.code;
                  if (this.state.code === 200) alert("Signup success");
                  else alert("Signup failed");
                });
        }
    }


    render(){
        return (
            <ImageBackground source = {login_background} style={{height:'100%', width: '100%', justifyContent: 'center'}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TextInput style={styles.inputbox} 
                placeholderTextColor='#000'
                placeholder="이메일" 
                onChangeText={(input)=>this.setState({email:input})}/>
                <TextInput secureTextEntry={true} style={styles.inputbox} 
                placeholderTextColor='#000'
                placeholder="비밀번호"
                onChangeText={(input)=>this.setState({password: input})}/>
                <TextInput secureTextEntry={true} 
                style={styles.inputbox} 
                placeholderTextColor='#000'
                placeholder="비밀번호 확인"
                onChangeText={(input)=>this.setState({confirmPassword: input})}/>
                <TouchableOpacity style={styles.button} onPress={()=>this.handleSubmit()} >
                <Text style={{color: '#fff'}}>회원가입 완료</Text>
                </TouchableOpacity>
                </View>
            </ImageBackground>
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
        width: "90%",
        borderColor: '#323c57',
        backgroundColor: '#fff',
        opacity: 0.3,
        borderWidth: 2,
        paddingLeft: 10,
    },
    button : {
        backgroundColor: "#000",
        alignItems: 'center',
        marginVertical: 10,
        padding:10,
        width: "50%"
    }
})


export default SignUp;
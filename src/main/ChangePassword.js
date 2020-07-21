import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class ChangePassword extends Component{
    constructor(props){
        super(props);
        this.state={
            originalPassword: '',
            newPassword: '',
            checkNewPassword: ''
        }
    }

    handleChangePassword = async function (email, originalPassword, newPassword, checkNewPassword){
        if (newPassword != checkNewPassword){
            alert("Passwords don't match");
            return;
        }
        alert("비밀번호가 변경되었습니다.");
        /* TODO: password change backend */
        // fetch('http://192.249.19.242:8480/change_pw', {
        //     method: 'POST',
        //     headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //     email: email,
        //     originalPassword: originalPassword,
        //     newPassword: newPassword,
        //     })
        // })
        // .then((response)=>response.json())
        // .then((json)=>{
        //     this.state.code = json.code;
        //     if(this.state.code === 200) alert("비밀번호가 변경되었습니다.", null, [
        //     { text: '확인', onPress: () => navigation.navigate('FourthTabScreen')}]);
        //     else if (this.state.code === 400) alert("기존 비밀번호가 일치하지 않습니다.");
        //     else if (this.state.code === 401) alert("비밀번호 확인이 일치하지 않습니다.");
        // })
    }

    render(){
    return (
        <View style={{flex: 1, backgroundColor: '#120814'}}>
            <TextInput style={styles.inputbox} placeholder="기존 비밀번호" onChangeText={(input) => this.setState({originalPassword: input})}/>
            <TextInput style={styles.inputbox} placeholder="새로운 비밀번호" onChangeText={(input) => this.setState({newPassword: input})}/>
            <TextInput style={styles.inputbox} placeholder="새로운 비밀번호 확인" onChangeText={(input) => this.setState({checkNewPassword: input})}/>
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    this.handleChangePassword(
                        this.props.email,
                        this.state.originalPassword,
                        this.state.newPassword,
                        this.state.checkNewPassword
                        )}>
            <Text style={styles.text}>확인</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        margin: 10,
        alignItems: 'flex-end',
        marginRight: 15
    },
    inputbox : {
        borderColor: 'gray',
        backgroundColor: '#fff',
        borderWidth: 1,
        paddingLeft: 10,
    },
    text: {
        color: "#fff",
        fontSize: 20
    },
});
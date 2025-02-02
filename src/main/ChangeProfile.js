import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, Image, ImageBackground, ToastAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
var bg = require('../../asset/night_background.jpg');

export default class ChangeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: '',
      nickname: '',
      aboutMe: '',
    };
  }

  /* Function for choosing image */
  chooseFile = () => {
    var options = {
      title: '사진 추가',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({filePath:response.uri});
      }
    });
  };

  handleImageSubmit = async function (imageUri) {
    var formData = new FormData();
    formData.append('photo', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo',
    });
    var response = await fetch('http://192.249.19.244:1380/image_upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
    var json = await response.json();
    return json.name;
  };

  /* Invoked after pressing submit button */
  handleProfileSubmit = async function () {
    const email = this.props.email;
    const aboutMe = this.state.aboutMe;
    var imageName = await this.handleImageSubmit(this.state.filePath);
    const nickname = this.state.nickname;
    fetch('http://192.249.19.244:1380/profile/set', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        nickname: nickname,
        profile_photo: imageName,
        intro: aboutMe
      })
    })
    .then((response)=>response.json())
    .then((json)=>{
      this.state.code = json.code;
      if(this.state.code === 200) alert("프로필을 수정하였습니다.", null, [
        { text: '확인', onPress: () => this.navigation.goBack(null)}]);
      else ToastAndroid.show("수정에 실패하였습니다", ToastAndroid.SHORT);
    })
  };
  render() {
    return (
      <ImageBackground source ={bg} style={{height:'100%', width: '100%'}}>
        <TextInput
          autoCapitalize='none'
          style={{borderColor: '#000',
          backgroundColor: '#fff',
          borderWidth: 1,
          paddingLeft: 10,}}
          placeholder="아이디"
          onChangeText={(input) => this.setState({nickname:input})}
        />
        <TextInput
          autoCapitalize='none'
          style={{borderColor: '#000',
          backgroundColor: '#fff',
          borderWidth: 1,
          paddingLeft: 10,}}
          placeholder="소개글"
          onChangeText={(input) => this.setState({aboutMe:input})}
        />
        <TouchableOpacity style={{padding: 5}}
          onPress={()=>this.chooseFile()}>
          <Text style={{alignItems: 'center', color: '#fff'}}>사진 변경</Text>
          <Image
            source={{uri: this.state.filePath}}
            style={{width: 250, height: 250}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            margin: 10,
            alignItems: 'flex-end',
            marginRight: 15,
          }}
          onPress={()=>this.handleProfileSubmit()}>
          <Text style={{color: '#fff', fontSize: 20}}>확인</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

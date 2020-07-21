import React, { Component } from "react";
import { Text,  TextInput, TouchableOpacity, Image, Alert, ImageBackground } from "react-native";
import ImagePicker from 'react-native-image-picker';
import {styles, bg} from "./App";

export default class UploadScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      filePath: '',
      title: '',
      content: '',
    }
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

  handlePostSubmit = async function () {
    const email = this.props.email;
    const title = this.state.title;
    const content = this.state.content;
    var imageName = await this.handleImageSubmit(this.state.filePath);
    fetch('http://192.249.19.244:1380/post/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        title: title,
        content: content,
        photo1: imageName
      })
    })
    .then((response)=>response.json())
    .then((json)=>{
      this.state.code = json.code;
      if(this.state.code === 200) alert("업로드에 성공하였습니다.", null, [
        { text: '확인', onPress: () => this.navigation.goBack()}]);
      else alert("업로드에 실패하였습니다.");
    })
  };

  render(){
    return (
    <ImageBackground source ={bg} style={{height:'100%', width: '100%'}}>
      <TextInput autoCapitalize='none' style={styles.inputbox} placeholder="제목" onChangeText={(input) => this.setState({title: input})}/>
      <TextInput autoCapitalize='none' style={styles.inputbox} placeholder="내용" onChangeText={(input) => this.setState({content: input})}/>
      <TouchableOpacity onPress={this.chooseFile}>
        <Text style={{ alignItems: 'center', color:'#fff', padding: 15 }}>사진 추가</Text>
        <Image
          source={{uri: this.state.filePath}}
          style={{ width: 250, height: 250 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: '#000', margin: 10, alignItems: 'flex-end', marginRight: 15}}
        onPress={() => Alert.alert('업로드 하시겠습니까?', null, [
          { text: '취소'},
          { text: '확인', onPress: () => this.handlePostSubmit()},
        ])}>
      <Text style={{color: '#fff', fontSize: 20}}>업로드</Text>
      </TouchableOpacity>
    </ImageBackground>
    )
  }
}
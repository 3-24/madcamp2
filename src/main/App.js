import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, PickerIOSComponent } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput } from "react-native-gesture-handler";
import { Input } from "react-native-elements";
import LoginComponent from '../login/LoginScreen';
import ImagePicker from 'react-native-image-picker';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

var profile_image = require('../../asset/profile_image.jpg')
function ChangePassword(){
  return (
    <View style={{flex: 1, backgroundColor: '#120814'}}>
        <TextInput style={styles.inputbox} placeholder="기존 비밀번호" onChangeText={(input) => this.setState({originalPassword: input})}/>
        <TextInput style={styles.inputbox} placeholder="새로운 비밀번호" onChangeText={(input) => this.setState({newPassword: input})}/>
        <TextInput style={styles.inputbox} placeholder="새로운 비밀번호 확인" onChangeText={(input) => this.setState({checkNewPassword: input})}/>
        <TouchableOpacity
            style={styles.button}
            onPress={() => handleChangePassword()}>
            <Text style={styles.text}>확인</Text>
        </TouchableOpacity>
    </View>
  )
}


function ChangeProfile(){
  showPicker=()=>{
    const options={
      title:'사진 추가',
      takePhotoButtonTitle: '카메라',
      chooseFromLibraryButtonTitle:'이미지 선택',
      cancelButtonTitle: '취소',
      storageOptions:{
        skipBackup: true, 
        path: 'images',
      }
    };
    ImagePicker.showImagePicker(options,(response) => {
      const uri = {uri: response.uri};
      this.setState({img:uri});
    })
  };
  return (
    <View style={{flex: 1, backgroundColor: '#120814'}}>
        <TextInput style={styles.inputbox} placeholder="아이디" onChangeText={(input) => this.setState({nickname: input})}/>
        <TouchableOpacity 
          style={styles.button}
          onPress={showPicker}>
          <Text style={styles.text}>사진 변경</Text>
        </TouchableOpacity>
        <TextInput style={styles.inputbox} placeholder="소개글" onChangeText={(input) => this.setState({aboutMe: input})}/>
        <TouchableOpacity
            style={styles.button}
            onPress={() => handleProfileSubmit()}>
            <Text style={styles.text}>확인</Text>
        </TouchableOpacity>

    </View>
  )
}

function UploadScreen({navigation}){
  showPicker=()=>{
    const options={
      title:'사진 추가',
      takePhotoButtonTitle: '카메라',
      chooseFromLibraryButtonTitle:'이미지 선택',
      cancelButtonTitle: '취소',
      storageOptions:{
        skipBackup: true, 
        path: 'images',
      }
    };
    ImagePicker.showImagePicker(options,(response) => {
      const uri = {uri: response.uri};
      this.setState({img:uri});
    })
  };
  return (
    <View style={{flex: 1, backgroundColor: '#120814'}}>
        <TextInput style={styles.inputbox} placeholder="제목" onChangeText={(input) => this.setState({title: input})}/>
        <TextInput style={styles.inputbox} placeholder="내용" onChangeText={(input) => this.setState({content: input})}/>
        <TouchableOpacity 
          style={styles.button}
          onPress={showPicker}>
          <Text style={styles.text}>사진 추가</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={showPicker}>
          <Text style={styles.text}>사진 추가</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={showPicker}>
          <Text style={styles.text}>사진 추가</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('업로드 하시겠습니까?', null, [
              { text: '취소', onPress: () => navigation.navigate('ThirdTabScreen')},
              { text: '확인', onPress: () => console.log('Confirm Pressed!')},
            ])}>
            <Text style={styles.text}>업로드</Text>
        </TouchableOpacity>
        
    </View>
  )       
}

function FirstTabScreen({navigation}) {
  return (
    <View style={{flex: 1,backgroundColor: '#120824'}}>
        <Text>This Tab is First</Text>
    </View>
  );
}
function SecondTabScreen({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: '#120824'}}>
    </View>
  );
}
function ThirdTabScreen({navigation}) {
  
  return (
    <View style={{flex: 1,backgroundColor: '#120824'}}>
        <TouchableOpacity 
            style={{backgroundColor: "#120824", padding: 15,  alignItems:'flex-end'}}
            onPress={() => navigation.navigate('ChangeProfile')}
        >
            <Text style={{color: "#fff"}}>회원정보 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={{backgroundColor: "#120824", padding: 15,  alignItems: 'flex-end'}}
            onPress={() => navigation.navigate('Upload')}
        >
            <Text style={{color: "#fff"}}>업로드</Text>
        </TouchableOpacity>
        <Text style={{color: "#fff", padding: 5}}>RandomID</Text>
        <Image
            style={{height:100, width:100, padding: 10}}
            source={profile_image}/>
        <Text style={{color: "#fff", padding: 5}}>안녕하세요 저는 22살 개발자이고요 과자와 고양이를 좋아합니다. 많이들 구경와주세요.</Text>
    </View>
  );
}
function FourthTabScreen({navigation}) {
  return (
    <View style={{ backgroundColor: '#120824'}}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('테마를 변경하시겠습니까?', null, [
              { text: '취소', onPress: () => console.log('Cancel Pressed!')},
              { text: '확인', onPress: () => console.log('Confirm Pressed!')},
            ])}>
            <Text style={styles.text}>테마 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={styles.text}>비밀번호 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('로그아웃 하시겠습니까?', null, [
              { text: '취소', onPress: () => console.log('Cancel Pressed!')},
              { text: '확인', onPress: () => navigation.navigate('Login')},
            ])}>
            <Text style={styles.text}>로그아웃</Text>
        </TouchableOpacity>
        <Text style={{color: "#fff", fontSize:10, textAlign: "center"}}>Made by Yeongsuk, Jeanne @2020</Text>
    </View>
  );
}

const FirstTabStack = createStackNavigator();

function FirstTabStackScreen() {
  return (
    <FirstTabStack.Navigator>
      <FirstTabStack.Screen name="FirstTabScreen" component={FirstTabScreen} options={{headerShown: false}}/>
    </FirstTabStack.Navigator>
  );
}
const SecondTabStack = createStackNavigator();

function SecondTabStackScreen() {
  return (
    <SecondTabStack.Navigator>
      <SecondTabStack.Screen name="SecondTabScreen" component={SecondTabScreen} options={{headerShown: false}}/>
    </SecondTabStack.Navigator>
  );
}
const ThirdTabStack = createStackNavigator();

function ThirdTabStackScreen() {
  return (
    <ThirdTabStack.Navigator>
      <ThirdTabStack.Screen name="ThirdTabScreen" component={ThirdTabScreen} options={{headerShown: false}}/>
      <ThirdTabStack.Screen name="ChangeProfile" component={ChangeProfile} options={{headerShown: false}}/>
      <ThirdTabStack.Screen name="Upload" component={UploadScreen} options={{headerShown: false}}/>
    </ThirdTabStack.Navigator>
  );
}
  const FourthTabStack = createStackNavigator();

  function FourthTabStackScreen() {
    return (
      <FourthTabStack.Navigator>
        <FourthTabStack.Screen name="FourthTabScreen" component={FourthTabScreen} options={{headerShown: false}}/>
        <FourthTabStack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown: false}}/>
        <FourthTabStack.Screen name="Login" component={LoginComponent}/>
      </FourthTabStack.Navigator>
    );
  }

const Tab = createBottomTabNavigator();

export default function App(props) {
  console.log(props.getEmail());
  return (
    <NavigationContainer independent = {true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {

            let iconName;
            
            if (route.name === 'FirstTabScreen'){
              iconName = 'people-outline'
            } else if (route.name === 'SecondTabScreen'){
              iconName = 'moon-outline'
            } else if (route.name === 'ThirdTabScreen') {
              iconName = 'person-circle-outline'
            } else if (route.name === 'FourthTabScreen'){
              iconName = 'cog-outline'
            }
            return <Ionicons name={iconName} size={25} color={color} />;
          },
          initialRouteName: "SecondTabScreen",
          swipeEnabled: true,
          headerShown: false,
          tabBarPosition: 'bottom',
          lazy: false,
        })}
        tabBarOptions={{
          activeTintColor: '#46c3ad',
          inactiveTintColor: '#888',
          showLabel: false,
          showIcon: true,
          style: {
            backgroundColor: '#120824',
            height: '9%',
          },
          indicatorStyle:{backgroundColor: '#888'},
          labelStyle:{fontSize:12}}}>
            <Tab.Screen name="FirstTabScreen" component={FirstTabStackScreen}/>
            <Tab.Screen name="SecondTabScreen" component={SecondTabStackScreen}/>
            <Tab.Screen name="ThirdTabScreen" component={ThirdTabStackScreen}/>
            <Tab.Screen name="FourthTabScreen" component={FourthTabStackScreen}/>

      </Tab.Navigator>  
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  button: {
      flex: 1,
      backgroundColor: "#120824",
      marginBottom: 10,
      padding: 15,
      justifyContent: 'flex-start',
      marginBottom: 10

  },
  cameraButton: {
    width: 100,
    height: 100,
    backgroundColor: 'pink'
  },
  text: {
      color: "#fff"
  },
  inputbox : {
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingLeft: 10,
  },
  preview: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
  
const options = {
  title: '사진 고르기',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

handleProfileSubmit = async function(){
  const {email, nickname, profileImage, aboutMe} = this.state;
  fetch('http://192.249.19.242:8480/profile', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      //email은 현재 로그인된 계정의 이메일을 받아와야할 것 같은데 받아오는게 되나..??
      //email보내는 이유는 그 사람 계정인거를 확인하려구!
      email: email,
      nickname: nickname,
      profileImage: profileImage,
      aboutMe: aboutMe
    })
  })
  .then((response)=>response.json())
  .then((json)=>{
    this.state.code = json.code;
    if(this.state.code === 200) alert("회원정보를 수정하였습니다.", null, [
      { text: '확인', onPress: () => navigation.navigate('ThirdTabScreen')}]);
    else alert("오류");
    //무슨 오류가 생길지는 아직 생각이 안남
  })
}

handleChangePassword = async function(){
  const {email, originalPassword, newPassword, checkNewPassword} = this.state;
  fetch('http://192.249.19.242:8480/profile', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      //email보내는 이유는 그 사람 계정인거를 확인하려구!
      originalPassword: originalPassword,
      newPassword: newPassword,
      checkNewPassword: checkNewPassword
    })
  })
  .then((response)=>response.json())
  .then((json)=>{
    this.state.code = json.code;
    if(this.state.code === 200) alert("비밀번호가 변경되었습니다.", null, [
      { text: '확인', onPress: () => navigation.navigate('FourthTabScreen')}]);
    else if (this.state.code === 400) alert("기존 비밀번호가 일치하지 않습니다.");
    else if (this.state.code === 401) alert("비밀번호 확인이 일치하지 않습니다.");
  })
}
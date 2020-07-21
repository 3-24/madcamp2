import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, PickerIOSComponent, Dimensions, StatusBar, ImageBackground } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput } from "react-native-gesture-handler";
import { Input } from "react-native-elements";
import LoginComponent from '../login/LoginScreen';
import CameraScreen from './CameraScreen'
import ImagePicker from 'react-native-image-picker';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import ChangePassword from "./ChangePassword"; 
import faker from 'faker';
import Daytheme from './DayTheme';

var profile_image = require('../../asset/profile_image.jpg')
var bg = require('../../asset/night_background.jpg')
const SCREEN_WIDTH = Dimensions.get('window').width;

function AddFriend(){
  const fakeData = [];
  for(i = 0; i < 100; i += 1) {
    fakeData.push({
      type: 'NORMAL',
      item: {
        id: 1,
        image: faker.image.avatar(),
        name: faker.name.firstName(),
        description: faker.random.words(5),
      },
    });
  }
  state = {
    list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData),
  };
  layoutProvider = new LayoutProvider((i) => {
    return state.list.getDataForIndex(i).type;
  }, (type, dim) => {
    switch (type) {
      case 'NORMAL': 
        dim.width = SCREEN_WIDTH;
        dim.height = 100;
        break;
      default: 
        dim.width = 0;
        dim.height = 0;
        break;
      };
    })
  
  rowRenderer = (type, data) => {
    const { image, name, description } = data.item;
    return (
      <View style={styles.listItem}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.body}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    )
  }
  return(
    <View style={{flex: 1, backgroundColor: '#120814'}}>
      <View style={{flexDirection: "column"}}>
          <TextInput style={styles.inputbox} placeholder="검색" onChangeText={(input) => this.setState({searchFriend: input})}/>
          <TouchableOpacity
              style={{backgroundColor: '#000', margin: 10, alignItems: 'flex-end', marginRight: 15}}
              onPress={() => Alert.alert('친구로 추가하시겠습니까?', null, [
                { text: '취소', onPress: () => console.log('Cancel Pressed!')},
                { text: '확인', onPress: () => console.log('Confirm Pressed!')},
              ])}>
              <Text style={{color: '#fff', fontSize: 20}}>확인</Text>
          </TouchableOpacity>
        </View>
        <RecyclerListView 
        style={{flex: 1}}
        rowRenderer={rowRenderer}
        dataProvider={state.list}
        layoutProvider={layoutProvider}/>
    </View>
  )
}


function ChangeProfile(){
  const [filePath, setfilePath] = useState(0);
  chooseFile = () => {
    var options = {
      title: '사진 추가',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = response.uri;
        setfilePath({filePath: source});
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
        <TextInput style={styles.inputbox} placeholder="아이디" onChangeText={(input) => this.setState({nickname: input})}/>
        <TouchableOpacity 
          style={styles.camerabutton}
          onPress={chooseFile}>
          <Text style={{ alignItems: 'center', color:'#fff' }}>사진 변경</Text>
          <Image
          source={{uri: filePath.filePath}}
          style={{ width: 250, height: 250 }}
          />
        </TouchableOpacity>
        <TextInput style={styles.inputbox} placeholder="소개글" onChangeText={(input) => this.setState({aboutMe: input})}/>
        <TouchableOpacity
            style={{backgroundColor: '#000', margin: 10, alignItems: 'flex-end', marginRight: 15}}
            onPress={() => handleProfileSubmit()}>
            <Text style={{color: '#fff', fontSize: 20}}>확인</Text>
        </TouchableOpacity>

    </View>
  )
}

function UploadScreen({navigation}){
  const [filePath, setfilePath] = useState(0);
  chooseFile = () => {
    var options = {
      title: '사진 추가',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = response.uri;
        setfilePath({filePath: source});
      }
    });
  };

  handleMainSubmit = async function(title, content, imageUri){
    var formData = new FormData();
    // formData.append('title', title);
    // formData.append('content', content);
    formData.append('photo', {uri: imageUri, type: 'image/jpeg', name: 'testPhotoName'});
    fetch('http://192.249.19.242:8480/mainSubmit',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
  }

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
        <TextInput style={styles.inputbox} placeholder="제목" onChangeText={(input) => this.setState({title: input})}/>
        <TextInput style={styles.inputbox} placeholder="내용" onChangeText={(input) => this.setState({content: input})}/>
        <TouchableOpacity
          onPress={chooseFile}>
          <Text style={{ alignItems: 'center', color:'#fff', padding: 15 }}>사진 추가</Text>
          <Image
          source={{uri: filePath.filePath}}
          style={{ width: 250, height: 250 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
            style={{backgroundColor: '#000', margin: 10, alignItems: 'flex-end', marginRight: 15}}
            onPress={() => Alert.alert('업로드 하시겠습니까?', null, [
              { text: '취소'},
              { text: '확인', onPress: () => handleMainSubmit('title', 'content' , filePath.filePath)},
            ])}>
            <Text style={{color: '#fff', fontSize: 20}}>업로드</Text>
        </TouchableOpacity>
    </View>
  )       
}

function FirstTabScreen({navigation}) {
  const userData = [];
  for(i = 0; i < 100; i += 1) {
    userData.push({
      type: 'NORMAL',
      item: {
        id: 1,
        image: faker.image.avatar(),
        name: faker.name.firstName(),
        description: faker.random.words(5),
      },
    });
  }
  state = {
    list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(userData),
  };
  layoutProvider = new LayoutProvider((i) => {
    return state.list.getDataForIndex(i).type;
  }, (type, dim) => {
    switch (type) {
      case 'NORMAL': 
        dim.width = SCREEN_WIDTH;
        dim.height = 100;
        break;
      default: 
        dim.width = 0;
        dim.height = 0;
        break;
      };
    })
  
  rowRenderer = (type, data) => {
    const { image, name, description } = data.item;
    return (
      <View style={styles.listItem}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.body}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    )
  }
  return (
    <ImageBackground source ={bg} style={{height:'100%', width: '100%'}}>
      <TouchableOpacity 
            style={{backgroundColor: "#000", padding: 15,  alignItems:'flex-end'}}
            onPress={() => navigation.navigate('AddFriend')}>
          <Text style={{color: "#fff"}}>친구 추가</Text>
      </TouchableOpacity>
        <RecyclerListView 
        style={{flex: 1}}
        rowRenderer={rowRenderer}
        dataProvider={state.list}
        layoutProvider={layoutProvider}/>
    </ImageBackground>
  );
}

function SecondTabScreen({navigation}) {
  const fakeData = [];
  for(i = 0; i < 100; i += 1) {
    fakeData.push({
      type: 'NORMAL',
      item: {
        id: 1,
        image: faker.image.avatar(),
        name: faker.name.firstName(),
        title: faker.random.word(),
        description: faker.random.words(5),
      },
    });
  }
  state = {
    list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData),
  };
  layoutProvider = new LayoutProvider((i) => {
    return state.list.getDataForIndex(i).type;
  }, (type, dim) => {
    switch (type) {
      case 'NORMAL': 
        dim.width = SCREEN_WIDTH;
        dim.height = 400;
        break;
      default: 
        dim.width = 0;
        dim.height = 0;
        break;
      };
    })
  
  rowRenderer = (type, data) => {
    const { image, title, name, description } = data.item;
    return (
      <View style={{flexDirection: 'row', margin: 10}}>
        <View style = {{flexDirection: 'column'}}>
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold', padding: 5}}>{name}</Text>
          <Image style={{width: 300, height: 300}} source={{ uri: image }} />
          <Text style={styles.name}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {/* <View style={styles.body}>
          <Text style={styles.name}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View> */}
      </View>
    )
  }
  return (
    <ImageBackground source ={bg} style={{height:'100%', width: '100%'}}>
      <RecyclerListView 
        style={{flex: 1}}
        rowRenderer={rowRenderer}
        dataProvider={state.list}
        layoutProvider={layoutProvider}/>
    </ImageBackground>
  );
}

function ThirdTabScreen({navigation}) {
  const fakeData = [];
  for(i = 0; i < 100; i += 1) {
    fakeData.push({
      type: 'NORMAL',
      item: {
        id: 1,
        image: faker.image.avatar(),
        description: faker.random.words(5),
      },
    });
  }
  state = {
    list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData),
  };
  layoutProvider = new LayoutProvider((i) => {
    return state.list.getDataForIndex(i).type;
  }, (type, dim) => {
    switch (type) {
      case 'NORMAL': 
        dim.width = SCREEN_WIDTH;
        dim.height = 400;
        break;
      default: 
        dim.width = 0;
        dim.height = 0;
        break;
      };
    })
  
  rowRenderer = (type, data) => {
    const { image, description } = data.item;
    return (
      <View style={{flexDirection: 'row', height: 200, alignItems: 'center'}}>
        <View style={{flexDirection: 'column'}}>
          <Image style={{width: 300, height: 300}} source={{ uri: image }} />
        {/* <View style={{marginLeft: 10, marginRight: 10, maxWidth: SCREEN_WIDTH - (80 + 10 + 20)}}> */}
          <Text style={styles.description}>{description}</Text>
        </View>
        {/* </View> */}
      </View>
    )
  }
  return (
    <ImageBackground source ={bg} style={{height:'100%', width: '100%'}}>
      <Text style={{color: "#fff", padding: 5, fontSize: 30, padding: 10}}>RandomID</Text>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Image
            style={{height:200, width:200, margin: 10}}
            source={profile_image}/>
          <View style={{flex:1, flexDirection: 'column'}}>
            <Text style={{color: "#fff", padding: 5}}>안녕하세요 저는 22살 개발자이고요 과자와 고양이를 좋아합니다. 많이들 구경와주세요.</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity 
                style={{backgroundColor: "#000", padding: 10,  alignItems:'flex-end', justifyContent: 'flex-end', marginTop: 10, marginBottom: 10, borderColor: '#fff', borderWidth: 1}}
                onPress={() => navigation.navigate('ChangeProfile')}
            >
                <Text style={{color: "#fff"}}>프로필 수정</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                  style={{backgroundColor: "#000", padding: 10,  alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 10, marginBottom: 10, marginLeft: 10, borderColor: '#fff', borderWidth: 1}}
                  onPress={() => navigation.navigate('Upload')}
              >
                  <Text style={{color: "#fff"}}>밤편지 쓰기</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
      <RecyclerListView 
        style={{flex: 1}}
        rowRenderer={rowRenderer}
        dataProvider={state.list}
        layoutProvider={layoutProvider}/>
    </ImageBackground>
  );
}

function FourthTabScreen({navigation}) {
  return (
    <ImageBackground source ={bg} style={{height:'100%', width: '100%'}}>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <TouchableOpacity
            style={{backgroundColor: '#000', padding: 20, marginBottom: 10, marginTop: 10, alignItems: 'center', width: "40%"}}
            onPress={() => Alert.alert('테마를 변경하시겠습니까?', null, [
              { text: '취소', onPress: () => console.log('Cancel Pressed!')},
              { text: '확인', onPress: () => console.log('Confirm Pressed!')},
              // navigation.navigate('Daytheme')
            ])}>
            <Text style={{color: '#fff', alignItems: 'flex-end', fontSize: 20}}>테마 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{backgroundColor: '#000', padding: 20, marginBottom: 10, alignItems: 'center', width: "40%"}}
            onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={{color: '#fff', alignItems: 'flex-end', fontSize: 20}}>비밀번호 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{backgroundColor: '#000', padding: 20, marginBottom: 10, alignItems: 'center', width: "40%"}}
            onPress={() => Alert.alert('로그아웃 하시겠습니까?', null, [
              { text: '취소', onPress: () => console.log('Cancel Pressed!')},
              { text: '확인', onPress: () => navigation.navigate('Login')},
            ])}>
            <Text style={{color: '#fff', alignItems: 'flex-end', fontSize: 20}}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <Text style={{color: "#fff", fontSize:10, textAlign: "center"}}>Made by Yeongsuk, Jeanne @2020</Text>
      <StatusBar barStyle ="light-content" hidden = {false} backgroundColor = '#000'/>
    </ImageBackground>
  );
}

const FirstTabStack = createStackNavigator();

function FirstTabStackScreen() {
  return (
    <FirstTabStack.Navigator>
      <FirstTabStack.Screen name="FirstTabScreen" component={FirstTabScreen} options={{headerShown: false}}/>
      <FirstTabStack.Screen name="AddFriend" component={AddFriend} options={{ title: '친구 추가', headerStyle:{ backgroundColor: '#8985d6' }, headerTitleStyle:{fontWeight: 'bold'}}}/>
    </FirstTabStack.Navigator>
  );
}
const SecondTabStack = createStackNavigator();

function SecondTabStackScreen() {
  return (
    <SecondTabStack.Navigator>
      <SecondTabStack.Screen name="SecondTabScreen" component={SecondTabScreen} options={{ title: '밤편지', headerStyle:{ backgroundColor: '#000' }, headerTitleStyle:{color: '#fff', fontWeight: 'bold'}}}/>
    </SecondTabStack.Navigator>
  );
}
const ThirdTabStack = createStackNavigator();

function ThirdTabStackScreen() {
  return (
    <ThirdTabStack.Navigator>
      <ThirdTabStack.Screen name="ThirdTabScreen" component={ThirdTabScreen} options={{headerShown: false}}/>
      <ThirdTabStack.Screen name="ChangeProfile" component={ChangeProfile} options={{ title: '회원정보 수정', headerStyle:{ backgroundColor: '#8985d6' }, headerTitleStyle:{fontWeight: 'bold', color: '#fff'}}}/>
      <ThirdTabStack.Screen name="Upload" component={UploadScreen} options={{ title: '밤편지 쓰기', headerStyle:{ backgroundColor: '#8985d6'}, headerTitleStyle:{fontWeight: 'bold', color: '#fff'}}}/>
      <ThirdTabStack.Screen name="CameraScreen" component={CameraScreen} options={{headerShown: false}}>
        {/* {()=><CameraScreen filePath={this.filePath}/>} */}
      </ThirdTabStack.Screen>
    </ThirdTabStack.Navigator>
  );
}
  const FourthTabStack = createStackNavigator();

  function FourthTabStackScreen(props) {
    return (
      <FourthTabStack.Navigator>
        <FourthTabStack.Screen name="FourthTabScreen" component={FourthTabScreen} options={{headerShown: false}}/>
        <FourthTabStack.Screen name="ChangePassword" options={{headerShown: false}}>
          {()=><ChangePassword email={props.email}/>} 
        </FourthTabStack.Screen>
      </FourthTabStack.Navigator>
    );
  }

const Tab = createBottomTabNavigator();

export default class App extends Component{
  constructor(props){
    super(props);
    this.email =  this.props.getEmail()
  }

  render(){
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
            backgroundColor: '#000',
            height: '7%',
          },
          indicatorStyle:{backgroundColor: '#888'},
          labelStyle:{fontSize:12}}}>
            <Tab.Screen name="FirstTabScreen" component={FirstTabStackScreen}/>
            <Tab.Screen name="SecondTabScreen" component={SecondTabStackScreen}/>
            <Tab.Screen name="ThirdTabScreen" component={ThirdTabStackScreen}/>
            <Tab.Screen name="FourthTabScreen">
              {()=><FourthTabStackScreen email={this.props.email}/>}
            </Tab.Screen>

      </Tab.Navigator>  
    </NavigationContainer>
  );
  }
}
const styles = StyleSheet.create({
  button: {
      backgroundColor: "#120824",
      marginBottom: 30,
      padding: 15,
      width: 15,
      justifyContent: 'flex-start',
      marginBottom: 10

  },
  cameraButton: {
    backgroundColor: "#fff"
  },
  text: {
      color: "#fff"
  },
  inputbox : {
    borderColor: '#fff',
    backgroundColor: '#c2bfff',
    borderWidth: 1,
    paddingLeft: 10,
  },
  preview: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    minHeight: 1,
    minWidth: 1,
  },
  body: {
    marginLeft: 10,
    marginRight: 10,
    maxWidth: SCREEN_WIDTH - (80 + 10 + 20),
  },
  image: {
    width: 80,
    height: 80
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.5,
  },
  listItem: {
    flexDirection: 'row',
    margin: 10,
  },
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
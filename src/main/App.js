import React, { Component, useState } from "react";
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Image, Alert, PickerIOSComponent, Dimensions, StatusBar, ImageBackground } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraScreen from './CameraScreen'
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import ChangePassword from "./ChangePassword"; 
import ChangeProfile from "./ChangeProfile";
import UploadScreen from "./UploadScreen";
import faker from 'faker';

export var bg = require('../../asset/night_background.jpg')
const SCREEN_WIDTH = Dimensions.get('window').width;

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255,45,85)',
  },
};

function AddFriend(props){
  console.log(props.email);
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
    <ImageBackground source ={bg} style={{height:'100%', width: '100%'}}>
      <View style={{flexDirection: "column"}}>
          <TextInput autoCapitalize='none' style={styles.nightInputbox} placeholder="검색" onChangeText={(input) => this.setState({searchFriend: input})}/>
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
    </ImageBackground>
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
      <StatusBar barStyle ="light-content" hidden = {false} backgroundColor = '#000'/>
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
      <View style={{flexDirection: 'row', margin: 10, justifyContent: 'center'}}>
        <View style = {{flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold', padding: 5}}>{name}</Text>
          <Image style={{width: 300, height: 300}} source={{ uri: image }} />
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
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
      <StatusBar barStyle ="light-content" hidden = {false} backgroundColor = '#000'/>
    </ImageBackground>
  );
}

class ThirdTabScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      imagePath: '',
      nickname: '',
      intro: ''
    }
    this.fakeData = [];
    for(i = 0; i < 100; i += 1) {
      this.fakeData.push({
        type: 'NORMAL',
        item: {
          id: 1,
          image: faker.image.avatar(),
          title: faker.random.word(),
          description: faker.random.words(5),
        },
      });
    }
    this.list = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(this.fakeData);
    this.layoutProvider = new LayoutProvider(
      (i) => {return state.list.getDataForIndex(i).type;},
      (type, dim) => {
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
      });
    this.rowRenderer = (type, data) => {
      const { image, title, description } = data.item;
      return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flexDirection: 'column'}}>
            <Image style={{width: 300, height: 300, margin: 15}} source={{ uri: image }} />
          {/* <View style={{marginLeft: 10, marginRight: 10, maxWidth: SCREEN_WIDTH - (80 + 10 + 20)}}> */}
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          {/* </View> */}
        </View>
      )
    }
  }

  componentDidMount(){
    this.fetchProfile()
  }


  /* Fetch profile information */
  fetchProfile(){
    const email = this.props.email;
    fetch('http://192.249.19.244:1380/profile/get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:email
      })
    })
    .then((response)=>response.json())
    .then((json)=>{
      if(json.code === 200){
        this.setState({imagePath:json.profile_photo});
        this.setState({nickname:json.nickname});
        this.setState({intro:json.intro});
      }
      else alert("프로필 로딩 중 오류가 발생하였습니다.");
    })
  }

  render(){
  return (
    <ImageBackground source ={bg} style={{height:'100%', width: '100%'}}>
      <Text style={{color: "#fff", padding: 5, fontSize: 30, padding: 10}}>{this.state.nickname}</Text>
      <View style={{flex:0.6, flexDirection: 'row', borderBottomColor: '#fff', borderBottomWidth: 0.5}}>
        <Image
            style={{height:200, width:200, margin: 10}}
            source={{uri: 'http://192.249.19.244:1380/image/'+this.state.imagePath}}/>
          <View style={{flex:1, flexDirection: 'column'}}>
            <Text style={{color: "#fff", padding: 5, fontSize: 15}}>{this.state.intro}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity 
                style={styles.nightThirdScreenButton}
                onPress={() => this.props.navigation.navigate('ChangeProfile')}
            >
                <Text style={{color: "#fff"}}>프로필 수정</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                  style={styles.nightThirdScreenButton}
                  onPress={() => this.props.navigation.navigate('Upload')}>
                  <Text style={{color: "#fff"}}>밤편지 쓰기</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
      <RecyclerListView 
        style={{flex: 1}}
        rowRenderer={this.rowRenderer}
        dataProvider={this.list}
        layoutProvider={this.layoutProvider}/>
      <StatusBar barStyle ="light-content" hidden = {false} backgroundColor = '#000'/>
    </ImageBackground>
  );}
}

function FourthTabScreen(props) {
  return (
    <ImageBackground source ={bg} style={{height:'100%', width: '100%'}}>
      <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
            style={styles.nightFourthScreenButton}
            onPress={() => Alert.alert('테마를 변경하시겠습니까?', null, [
              { text: '취소', onPress: () => console.log('Cancel Pressed!')},
              { text: '확인', onPress: () => console.log('Change pressed!')},
              // navigation.navigate('Daytheme')
            ])}>
            <Text style={{color: '#fff', alignItems: 'flex-end', fontSize: 20}}>테마 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.nightFourthScreenButton}
            onPress={() => props.navigation.navigate('ChangePassword')}>
            <Text style={{color: '#fff', alignItems: 'flex-end', fontSize: 20}}>비밀번호 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.nightFourthScreenButton}
            onPress={() => Alert.alert('로그아웃 하시겠습니까?', null, [
              { text: '취소', onPress: () => console.log('Cancel Pressed!')},
              { text: '확인', onPress: () => props.authHandler(false)},
            ])}>
            <Text style={{color: '#fff', alignItems: 'flex-end', fontSize: 20}}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <Text style={{color: "#fff", fontSize:10, textAlign: "center"}}>Made by Yeongseok, Jeanne @2020</Text>
      <StatusBar barStyle ="light-content" hidden = {false} backgroundColor = '#000'/>
    </ImageBackground>
  );
}

const FirstTabStack = createStackNavigator();

function FirstTabStackScreen(props) {
  console.log(props.email);
  return (
    <FirstTabStack.Navigator>
      <FirstTabStack.Screen  name="FirstTabScreen" options={{headerShown: false}}>
        {(props1)=><FirstTabScreen  email={props.email} navigation={props1.navigation}/> }
      </FirstTabStack.Screen>
      <FirstTabStack.Screen name="AddFriend"  options={{ title: '친구 추가', headerStyle:{ backgroundColor: '#000' }, headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold', color: '#fff'}}}>
        {()=><AddFriend email={props.email}/>}
      </FirstTabStack.Screen>
    </FirstTabStack.Navigator>
  );
}
const SecondTabStack = createStackNavigator();

function SecondTabStackScreen() {
  return (
    <SecondTabStack.Navigator>
      <SecondTabStack.Screen name="SecondTabScreen" component={SecondTabScreen} options={{ title: '밤편지', headerStyle:{ backgroundColor: '#000' }, headerTintColor: '#fff', headerTitleStyle:{color: '#fff', fontWeight: 'bold'}}}/>
    </SecondTabStack.Navigator>
  );
}
const ThirdTabStack = createStackNavigator();

function ThirdTabStackScreen(props) {
  console.log(props.email);
  return (
    <ThirdTabStack.Navigator>
      <ThirdTabStack.Screen  name="ThirdTabScreen" options={{headerShown: false}}>
        {(props1)=><ThirdTabScreen  email={props.email} navigation={props1.navigation}/> }
      </ThirdTabStack.Screen>
      <ThirdTabStack.Screen name="ChangeProfile" options={{ title: '프로필 수정', headerStyle:{ backgroundColor: '#000' }, headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold', color: '#fff'}}}>
        {()=><ChangeProfile email={props.email}/>}
      </ThirdTabStack.Screen>
      <ThirdTabStack.Screen name="Upload" options={{ title: '밤편지 쓰기', headerStyle:{ backgroundColor: '#000'}, headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold', color: '#fff'}}}>
        {()=><UploadScreen email={props.email}/>}
      </ThirdTabStack.Screen>

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
        <FourthTabStack.Screen name="FourthTabScreen" options={{headerShown: false}}>
          {(_props)=><FourthTabScreen authHandler={props.authHandler} navigation={_props.navigation}/>}
        </FourthTabStack.Screen>
        <FourthTabStack.Screen name="ChangePassword" options={{ title: '비밀번호 변경', headerStyle:{ backgroundColor: '#000' }, headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold', color: '#fff'}}}>
          {()=><ChangePassword email={props.email}/>} 
        </FourthTabStack.Screen>
      </FourthTabStack.Navigator>
    );
  }

const Tab = createBottomTabNavigator();

export default class App extends Component{
  constructor(props){
    super(props);
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
          labelStyle:{fontSize:12}}}>
            <Tab.Screen name="FirstTabScreen">
              {()=><FirstTabStackScreen email={this.props.email}/>}
            </Tab.Screen>
            <Tab.Screen name="SecondTabScreen" component={SecondTabStackScreen}/>
            <Tab.Screen name="ThirdTabScreen">
              {()=><ThirdTabStackScreen email={this.props.email}/>}
            </Tab.Screen>
            <Tab.Screen name="FourthTabScreen">
              {(_props)=><FourthTabStackScreen email={this.props.email}
                authHandler={this.props.authHandler} navigation={_props.navigation}/>}
            </Tab.Screen>

      </Tab.Navigator>  
    </NavigationContainer>
  );
  }
}
export const styles = StyleSheet.create({
  nightBar: {
    backgroundColor: '#000',
    height: '7%'
  },
  darBar: {
    backgroundColor: '#ffcccc',
    height: '7%'
  },
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
  nightInputbox : {
    borderColor: '#000',
    backgroundColor: '#fff',
    opacity: 0.3,
    borderWidth: 1,
    paddingLeft: 10,
  },
  dayInputbox : {
    borderColor: '#99b1d1',
    backgroundColor: '#b1becf',
    opacity: 0.3,
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
    fontWeight: 'bold'
  },
  description: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8
  },
  listItem: {
    flexDirection: 'row',
    margin: 10,
  },

  nightThirdScreenButton: {
    backgroundColor: "#000", 
    padding: 10,  
    alignItems:'flex-end', 
    justifyContent: 'flex-end', 
    marginTop: 10, 
    marginBottom: 10, 
    borderColor: '#fff', 
    borderWidth: 0.3
  },

  dayThirdScreenButton: {
    backgroundColor: "#6e87a6", 
    padding: 10,  
    alignItems:'flex-end', 
    justifyContent: 'flex-end', 
    marginTop: 10, 
    marginBottom: 10, 
    borderColor: '#fff', 
    borderWidth: 0.3
  },

  nightFourthScreenButton: {
    backgroundColor: '#000', 
    padding: 20, 
    marginBottom: 10, 
    marginTop: 10, 
    alignItems: 'center', 
    width: "40%"
  },

  dayFourthScreenButton: {
    backgroundColor: '#627c9f', 
    padding: 20, 
    marginBottom: 10, 
    marginTop: 10, 
    alignItems: 'center', 
    width: "40%"
  }

});
  
const options = {
  title: '사진 고르기',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

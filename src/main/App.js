import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput } from "react-native-gesture-handler";
var profile_image = require('../../asset/profile_image.jpg')
function ChangePassword(){
  return (
    <View style={{flex: 1, backgroundColor: '#120814'}}>
        <TextInput style={styles.inputbox} placeholder="기존 비밀번호"/>
        <TextInput style={styles.inputbox} placeholder="새로운 비밀번호"/>
        <TextInput style={styles.inputbox} placeholder="새로운 비밀번호 확인"/>
        <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('비밀번호가 변경되었습니다.')}>
            <Text style={styles.text}>확인</Text>
        </TouchableOpacity>
    </View>
  )
}
function ChangeProfile(){
  return (
    <View style={{flex: 1, backgroundColor: '#120814'}}>
        <TextInput style={styles.inputbox} placeholder="아이디"/>
        <TextInput style={styles.inputbox} placeholder="프로필 사진"/>
        <TextInput style={styles.inputbox} placeholder="소개글"/>
        <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('회원정보가 변경되었습니다.')}>
            <Text style={styles.text}>확인</Text>
        </TouchableOpacity>

    </View>
  )
}
function Upload(){
  return (
    <View style={{flex: 1, backgroundColor: '#120814'}}>
        <Text style={{color:'#fff'}}>안녕하세요</Text>

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
        <TouchableOpacity 
            style={{flex: 1, backgroundColor: "#120824", padding: 15,  alignItems: 'flex-end'}}
            onPress={() => navigation.navigate('Upload')}
        >
            <Text style={{color: "#fff"}}>업로드</Text>
        </TouchableOpacity>
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
            onPress={() => Alert.alert('테마를 변경하시겠습니까?')}>
            <Text style={styles.text}>테마 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={styles.text}>비밀번호 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('로그아웃 하시겠습니까?')}>
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
      <FirstTabStack.Screen name="FirstTabScreen" component={FirstTabScreen} />
    </FirstTabStack.Navigator>
  );
}
const SecondTabStack = createStackNavigator();

function SecondTabStackScreen() {
  return (
    <SecondTabStack.Navigator>
      <SecondTabStack.Screen name="SecondTabScreen" component={SecondTabScreen} />
      <SecondTabStack.Screen name="Upload" component={Upload} />
    </SecondTabStack.Navigator>
  );
}
const ThirdTabStack = createStackNavigator();

function ThirdTabStackScreen() {
  return (
    <ThirdTabStack.Navigator>
      <ThirdTabStack.Screen name="ThirdTabScreen" component={ThirdTabScreen} />
      <ThirdTabStack.Screen name="ChangeProfile" component={ChangeProfile} />
    </ThirdTabStack.Navigator>
  );
}
  const FourthTabStack = createStackNavigator();

  function FourthTabStackScreen() {
    return (
      <FourthTabStack.Navigator>
        <FourthTabStack.Screen name="FourthTabScreen" component={FourthTabScreen} />
        <FourthTabStack.Screen name="ChangePassword" component={ChangePassword} />
      </FourthTabStack.Navigator>
    );
  }

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent = {true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

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
  text: {
      color: "#fff"
  },
  inputbox : {
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingLeft: 10,
  },
});
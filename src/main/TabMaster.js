import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import FirstTabScreen from "../FirstTabScreen";
import SecondTabScreen from "../SecondTabScreen";
import ThirdTabScreen from "../ThirdTabScreen";
import FourthTabScreen from "../FourthTabScreen";

const FirstTabStack = createStackNavigator(
  {
    FirstTabScreen: {screen: FirstTabScreen, navigationOptions: {header:false}}
  },
  // if you need.
  // recommend custom header
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "친구",
    }),
  }
);
const SecondTabStack = createStackNavigator(
  {
    SecondTabScreen: {screen: SecondTabScreen, navigationOptions: {header:false}}
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "피드",
    }),
  }
);
const ThirdTabStack = createStackNavigator(
    {
        ThirdTabScreen: {screen: ThirdTabScreen, navigationOptions: {header:false}}
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        title: "프로필",
      }),
    }
  );
  const FourthTabStack = createStackNavigator(
    {
        FourthTabScreen: {screen: FourthTabScreen, navigationOptions: {header:false}}
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        title: "설정",
      }),
    }
  );

const TabNavigator = createMaterialTopTabNavigator(
  {
    친구: FirstTabStack,
    피드: SecondTabStack,
    프로필: ThirdTabStack,
    설정: FourthTabStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        //let icon = "▲";

        if (routeName === "친구") {
          <Icon name='people-outline' style={{color:tintColor}} />
        } else if (routeName === "피드") {
          <Icon name='moon-outline' style={{color:tintColor}} />
        } else if (routeName === "프로필") {
          <Icon name='person-circle-outline' style={{color:tintColor}} />
        } else if (routeName === "설정"){
          <Icon name='cog-outline' style={{color:tintColor}} />
        }

        // can use react-native-vector-icons
        // <Icon name={iconName} size={iconSize} color={iconColor} />
        // return (
        //   <Text style={{ color: (focused && "#46c3ad") || "#888" }}>
           
        //   </Text>
        // );
      },
    }),
    initialRouteName: "피드",
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    lazy: false,
    tabBarOptions: {
      activeTintColor: "#46c3ad",
      inactiveTintColor: "#888",
      showIcon: true
    },
  }
);

const AppStack = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

export default createAppContainer(AppStack);
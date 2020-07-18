import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import FirstTabScreen from './FirstTabScreen';
import SecondTabScreen from './SecondTabScreen';
import ThirdTabScreen from './ThirdTabScreen';

const Router = createMaterialTopTabNavigator({
    First: {
        screen: FirstTabScreen,
        navigationOptions: {
            tabBarLabel: '친구',
            tabBarIcon: ({tintColor}) => (
                <Icon name='people-outline' style={{color: tintColor}} />
            )
        }
    },
    Second: {
        screen: SecondTabScreen,
        navigationOptions: {
            tabBarLabel: '피드',
            tabBarIcon: ({tintColor}) => (
                <Icon name='grid-outline' style={{color: tintColor}} />
            )
        }
    },
    Third: {
        screen: ThirdTabScreen,
        navigationOptions: {
            tabBarLabel: '프로필',
            tabBarIcon: ({tintColor}) => (
                <Icon name='happy-outline' style={{color: tintColor}} />
            )
        }
    }
}, {
    initialRouteName: "First",  // 처음 보여질 탭
    tabBarPosition: 'bottom',   // 탭 위치
    swipeEnabled: true,         // Swipe 기능
    lazy: true,                 // Default 값 true, 활성화 된 탭만 렌더링 할 것인지 여부.
    tabBarOptions: {
        inactiveTintColor: '#b3b3b3',
        activeTintColor: '#000',
        showIcon: true
    }
});

export default Router;
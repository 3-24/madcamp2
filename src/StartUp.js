import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from './splash/SplashScreen';
import LoginComponent from './login/LoginScreen';

const Navigator=createStackNavigator({
    SplashScreen :{screen: SplashScreen, navigationOptions: {header:false}},
    LoginComponent :{screen: LoginComponent, navigationOptions: {header:false}}
});

export default createAppContainer(Navigator);
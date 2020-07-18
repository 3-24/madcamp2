import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import SplashScreen from './SplashScreen';
import LoginComponent from './LoginScreen';

const Navigator=createSwitchNavigator({
    SplashScreen :{screen: SplashScreen, navigationOptions: {header:false}},
    LoginComponent :{screen: LoginComponent, navigationOptions: {header:false}}
});

export default createAppContainer(Navigator);
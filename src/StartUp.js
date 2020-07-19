import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './splash/SplashScreen';
import LoginComponent from './login/LoginScreen';
import App from './main/App';

const Stack = createStackNavigator();

class Start extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            auth: false
        }
        this.loadingHandler = this.loadingHandler.bind(this);
    }
    
    loadingHandler(){
        this.setState({isLoading: false});
    }

    render(){
        if (this.state.isLoading){
            return <SplashScreen handler={this.loadingHandler}/>;
        }
        return(
            <NavigationContainer>
            <Stack.Navigator>
                { this.state.auth  ? (
                    <Stack.screen name="Main" component={App}/>
                ) : (
                    <Stack.screen name="LogIn" component={LoginComponent}/>
                )}
            </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Start;
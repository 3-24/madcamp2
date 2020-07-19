import React, {Component, createContext} from 'react';

import SplashScreen from './splash/SplashScreen';
import LoginComponent from './login/LoginScreen';
import App from './main/App';

class Start extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            isLogined: false
        }
        this.loadingHandler = this.loadingHandler.bind(this);
        this.authHandler = this.authHandler.bind(this);
    }
    
    loadingHandler(){
        this.setState({isLoading: false});
    }

    authHandler(value){
        this.setState({isLogined: value});
    }

    render(){
        if (this.state.isLoading){
            return <SplashScreen handler={this.loadingHandler}/>;
        }
        if (this.state.isLogined){
            return <App />
        }
        else{
            return <LoginComponent handler={this.authHandler}/>
        }
    }
}
export default Start;
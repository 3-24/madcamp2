import React, {Component, createContext} from 'react';

import SplashScreen from './splash/SplashScreen';
import LoginComponent from './login/LoginScreen';
import App from './main/App';

class Start extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            auth: false
        }
        this.loadingHandler = this.loadingHandler.bind(this);
        this.authHandler = this.authHandler.bind(this);
    }
    
    loadingHandler(){
        this.setState({isLoading: false});
    }

    authHandler(auth){
        this.setState({auth: auth});
    }

    render(){
        if (this.state.isLoading){
            return <SplashScreen handler={this.loadingHandler}/>;
        }
        if (this.state.auth){
            return <App />
        }
        else{
            return <LoginComponent handler={this.authHandler}/>
        }
    }
}
export default Start;
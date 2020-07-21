import React, {Component} from 'react';

import SplashScreen from './splash/SplashScreen';
import LoginComponent from './login/LoginScreen';
import App from './main/App';

class Start extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            isLogined: false,
            email:''
        }
        this.loadingHandler = this.loadingHandler.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.getEmail = this.getEmail.bind(this);
    }
    
    loadingHandler(){
        this.setState({isLoading: false});
    }

    authHandler(value){
        this.setState({isLogined: value});
    }

    changeEmail(value){
        this.setState({
            email: value
        })
    }

    getEmail(){
        return this.state.email;
    }

    render(){
        if (this.state.isLoading){
            return <SplashScreen handler={this.loadingHandler}/>;
        }
        if (this.state.isLogined){
            return <App getEmail={this.getEmail}/>
        }
        else{
            return(
                <LoginComponent handler={this.authHandler} changeEmail={this.changeEmail}/>
            )
        }
    }
}
export default Start;
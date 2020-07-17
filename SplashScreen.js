import React, { Component } from 'react';
import {View, ImageBackground, Image} from 'react-native'

var bg=require('./background.png');
var logo=require('./logo.png');
export default class SplashScreen extends Component {

    constructor(props)
    {
        super(props);
        setTimeout(()=>
        {
            this.props.navigation.navigate("LoginComponent");
        }, 5000);
    }
    render(){
        return(
            <ImageBackground
                source={bg}
                style={{height:'100%', width:'100%'}}
            >
                <View
                style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                    <Image
                    source={logo}
                    style={{height:100, width:100}}>
                    </Image>
                </View>
            </ImageBackground>
        ); 
    }
}
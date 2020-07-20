import React, {Component} from 'react';
import { ImageBackground, Image, StyleSheet, Animated, StatusBar} from 'react-native';

var bg = require('../../asset/star_background.png')
var img_logo=require('../../asset/new_moon_logo.png');
var txt_logo=require('../../asset/txt_logo.png');
class SplashScreen extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            LogoAnime: new Animated.Value(0),
            loadingSpinner: false,
            isLoading: false
        };
        setTimeout(()=>
        {
            this.props.handler();
        }, 4000);
    }
    componentDidMount() {
        const moonAnimation =
            Animated.timing(this.state.LogoAnime, {
                toValue: 1,
                duration: 2000,
                useNativeDriver : true,
            });
        Animated.sequence([
            moonAnimation
        ]).start();
        
    }
    render() {
        return (
              <ImageBackground source ={bg} style={{height:'100%', width: '100%'}}>
                <Animated.View style={{opacity: this.state.LogoAnime, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source = {img_logo}
                            style={{height: 80, width: 80, justifyContent: 'center', alignItems: 'center', marginTop: 50}}/>
                </Animated.View>
                <StatusBar barStyle ="light-content" hidden = {false} backgroundColor = '#000'/>
            </ImageBackground>
        ) 
    }
}
export default SplashScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#120824',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
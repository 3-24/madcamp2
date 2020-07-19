import React, {Component} from 'react';
import { ImageBackground, Image, StyleSheet, Animated} from 'react-native';

var bg = require('../../asset/new_background.png')
var img_logo=require('../../asset/img_logo.png');
var txt_logo=require('../../asset/txt_logo.png');
class SplashScreen extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            LogoAnime: new Animated.Value(0),
            LogoText: new Animated.Value(0),
            loadingSpinner: false,
            isLoading: false
        };
        setTimeout(()=>
        {
            this.props.handler();
        }, 6000);
    }
    componentDidMount() {
        const moonAnimation =
            Animated.timing(this.state.LogoAnime, {
                toValue: 1,
                duration: 2000,
                useNativeDriver : true,
            });
        const txtAnimation =
            Animated.timing(this.state.LogoText, {
                toValue: 1,
                duration: 2000,
                useNativeDriver : true,
            });
        
        Animated.sequence([
            moonAnimation, txtAnimation
        ]).start();
        
    }
    render() {
        return (
              <ImageBackground source ={bg} style={{height:'100%', width: '100%'}}>
                <Animated.View style={{opacity: this.state.LogoAnime}}>
                    <Image source = {img_logo}
                            style={{height: 100, width: 100}}/>
                </Animated.View>
                <Animated.View style={{opacity: this.state.LogoText}}>
                    <Image source={txt_logo} style={{height: 400, width: 400}}/>
                </Animated.View>
            </ImageBackground>
        ) 
    }
}
export default SplashScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#120823',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
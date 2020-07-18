import React from 'react';
import { View, Text } from 'react-native';

export default class ThirdTabScreen extends React.Component {
    constructor(props)
    {
        super(props);
        this.props.navigation.navigate("ThirdTabScreen");
    }
    
    render() {
        return (
            <View style={{flex: 1,backgroundColor: '#121229'}}>
                <Text>This Tab is Third</Text>
            </View>
        );
    }
}
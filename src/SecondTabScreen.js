import React from 'react';
import { View, Text } from 'react-native';

export default class SecondTabScreen extends React.Component {
    constructor(props)
    {
        super(props);
        this.props.navigation.navigate("SecondTabScreen");
    }
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#121229'}}>
                <Text>This Tab is Second</Text>
            </View>
        );
    }
}
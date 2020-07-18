import React from 'react';
import { View, Text } from 'react-native';

export default class FourthTabScreen extends React.Component {
    constructor(props)
    {
        super(props);
        this.props.navigation.navigate("FourthTabScreen");
    }
    
    render() {
        return (
            <View style={{flex: 1,backgroundColor: '#121229'}}>
                <Text>This Tab is Fourth</Text>
            </View>
        );
    }
}
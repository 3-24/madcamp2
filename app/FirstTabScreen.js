import React from 'react';
import { View, Text } from 'react-native';

export default class FirstTabScreen extends React.Component {
    constructor(props)
    {
        super(props);
        this.props.navigation.navigate("FirstTabScreen");
    }
    
    render() {
        return (
            <View style={{flex: 1,backgroundColor: '#121229'}}>
                <Text>This Tab is First</Text>
            </View>
        );
    }
}
import { Component } from "react";
import {ImageBackground, View, Text} from 'react-native';

var bg = require('../../asset/night_background.jpg')

export default class AddFriend extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchFriendEmail: '',
        }
    }

    // const fakeData = [];
    // for(i = 0; i < 100; i += 1) {
    //   fakeData.push({
    //     type: 'NORMAL',
    //     item: {
    //       id: 1,
    //       image: faker.image.avatar(),
    //       name: faker.name.firstName(),
    //       description: faker.random.words(5),
    //     },
    //   });
    // }
    // state = {
    //   list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData),
    // };
    // layoutProvider = new LayoutProvider((i) => {
    //   return state.list.getDataForIndex(i).type;
    // }, (type, dim) => {
    //   switch (type) {
    //     case 'NORMAL': 
    //       dim.width = SCREEN_WIDTH;
    //       dim.height = 100;
    //       break;
    //     default: 
    //       dim.width = 0;
    //       dim.height = 0;
    //       break;
    //     };
    //   })
    
    // rowRenderer = (type, data) => {
    //   const { image, name, description } = data.item;
    //   return (
    //     <View style={styles.listItem}>
    //       <Image style={styles.image} source={{ uri: image }} />
    //       <View style={styles.body}>
    //         <Text style={styles.name}>{name}</Text>
    //         <Text style={styles.description}>{description}</Text>
    //       </View>
    //     </View>
    //   )
    // }

    handleAddFriend = async function () {
        const email = this.props.email;
        const searchFriend = this.state.searchFriend;
        fetch('http://192.249.19.244:1380/searchFriend', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            searchFriendEmail: searchFriendEmail
            })
        })
        .then((response)=>response.json())
        .then((json)=>{
            this.state.code = json.code;
            if(this.state.code === 200) alert("친구로 추가하였습니다.", null, [
            { text: '확인', onPress: () => this.navigation.goBack()}]);
            else alert("친구추가에 실패했습니다.");
        })
    };

    render(){
        return(
        <ImageBackground source ={bg} style={{height:'100%', width: '100%'}}>
            <View style={{flexDirection: "column"}}>
                <TextInput style={styles.nightInputbox} placeholder="검색" onChangeText={(input) => this.setState({searchFriendEmail: input})}/>
                <TouchableOpacity
                    style={{backgroundColor: '#000', margin: 10, alignItems: 'flex-end', marginRight: 15}}
                    onPress={() => Alert.alert('친구로 추가하시겠습니까?', null, [
                    { text: '취소', onPress: () => this.navigation.goBack()},
                    { text: '확인', onPress: () => this.handleAddFriend()},
                    ])}>
                    <Text style={{color: '#fff', fontSize: 20}}>확인</Text>
                </TouchableOpacity>
            </View>
            {/* <RecyclerListView 
            style={{flex: 1}}
            rowRenderer={rowRenderer}
            dataProvider={state.list}
            layoutProvider={layoutProvider}/> */}
        </ImageBackground>
        )
    }
  }
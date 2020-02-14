import React, { Component } from 'react';
import {Alert, View,Text, TouchableOpacity} from 'react-native';

export default class NumbFollowers extends Component{
    render(){
    return(
        <TouchableOpacity onPress={()=> {
            Alert.alert("You are following 12345 users");
            }}>
        <View style={{flexDirection: 'column'}}>
             <Text style={{paddingTop:20}}> 12345 </Text>
             <Text style={{paddingTop:10}}> Followers</Text>
        </View>
        </TouchableOpacity>
    )};
}
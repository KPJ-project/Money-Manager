import React from 'react';
import { StyleSheet, Text, View, Button, Alert,ScrollView  } from 'react-native';
import { Actions } from 'react-native-router-flux';

import MoneyContent from './MoneyRecord/MoneyContent';


export default class Main extends React.Component{
    
    render(){
        return(

            <View style={[styles.container]}>
                <View style={{width: "100%",height: 250,  backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onPress={()=>{Actions.segment()}} color="#fff" title="가게부 보기"/>
                </View>
                <View style={{width: "100%",height: 250, backgroundColor: 'darkblue', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onPress={()=>{Actions.calcInput()}} color="#fff" title="가게부 입력"/>
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', //자식 뷰 컴포넌트 간격에 영향을 준다.
        alignItems: 'center',
        backgroundColor: '#fff',
    },
  });
  
import React from 'react';
import { StyleSheet, Text, View, Button, Alert,ScrollView  } from 'react-native';
import Detail from './detail';

import GetMoney from './GetMoney'
import LostMoney from './LostMoney'
import { Actions } from 'react-native-router-flux';

//import Numbe//rFormat from 'react-number-format';

export default class Main extends React.Component{
constructor(props) {
    super(props);
    this.state = {
    };
    }
    
componentDidMount() {

}

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
  
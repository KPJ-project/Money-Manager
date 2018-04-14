import React from 'react';
import { StyleSheet, Text, View, Button, Alert,ScrollView } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'
import MoneyContent from './MoneyContent';

import GetMoney from './GetMoney'
import LostMoney from './LostMoney'
import Cost from './Cost'
import SegmentExample from './Segment'
import Main from './Main'
import CalcInput from './CalcInput'

export default class App extends React.Component {

  render(){
    return (
      <Router>


          <Scene key="root">

          <Scene
              key="mainPage"
              component={Main}
              title= "태형이 가계부😍 메인"
              initial
              />

          <Scene
              key="calcInput"
              component={CalcInput}
              title= "태형이 가계부😍 - 입력"
              />

          <Scene
              key="segment"
              component={SegmentExample}
              title= "태형이 가계부😍 - 보기"
               />
            
            <Scene
              key="costmoney"
              component={Cost}
              title= "Cost"
               />
            
            <Scene
              key="lostmoney"
              component={LostMoney}
              title= "LostMoney" 
              />



            </Scene>



        </Router>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toptitle: {
    marginTop:100,
    marginBottom:50,
    fontSize:40
},
cost: {
  marginTop:30,
  marginBottom:50,
  fontSize:40,
}
});

import React from 'react';
import { StyleSheet, Text, View, Button, Alert,ScrollView } from 'react-native';

import { Router, Scene, Lightbox } from 'react-native-router-flux'
import MoneyContent from './MoneyRecord/MoneyContent';

import Main from './MainScreen/Main'
import loginLightbox from './MainScreen/loginLightbox'

import CalcInput from './MoneyInput/CalcInput'

import Detail from './MoneyRecord/Detail'
import Expense from './MoneyRecord/Expense'
import SegmentExample from './MoneyRecord/Segment'


export default class App extends React.Component {

  render(){
    return (

      <Router uriPrefix={'localhost:8080/api'}>
        <Lightbox>
            <Scene key="root">

              <Scene
                  key="mainPage"
                  component={Main}
                  title= "가계부😍 메인"
                  initial
                  />

              <Scene
                  key="calcInput"
                  component={CalcInput}
                  title= "가계부😍 - 입력"
                  />

              <Scene
                  key="segment"
                  component={SegmentExample}
                  title= "가계부😍 - 보기"
                  />
                
                <Scene
                  key="costmoney"
                  component={Expense}
                  title= "Expense"
                  
                  />

                <Scene
                  key="detail"
                  path={"/list/:id"}
                  component={Detail}
                  title= "가계부😍 - 상세페이지" 
                  />

                <Scene
                  key="loginLightbox"
                  component={loginLightbox}
                  title= "로그인" 
                  />

            </Scene>
        </Lightbox>
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

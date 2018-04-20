import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native';

import { Router, Scene, Lightbox } from 'react-native-router-flux'
import MoneyContent from './MoneyRecord/MoneyContent';

import Main from './MainScreen/Main'
import Loading from './MainScreen/Loading'
import loginLightbox from './MainScreen/loginLightbox'

import CalcInput from './MoneyInput/CalcInput'

import Detail from './MoneyRecord/Detail'
import Expense from './MoneyRecord/Expense'
import SegmentExample from './MoneyRecord/Segment'
import Expo from 'expo';




export default class App extends React.Component {

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
  }
  render() {
    return (

      <Router uriPrefix={'localhost:8080/api'}>
        <Lightbox>
          <Scene key="root">

            <Scene
              key="loading"
              component={Loading}
              title="로딩"
              initial
            />

            <Scene
              key="mainPage"
              component={Main}
              title="가계부😍 메인"
            />

            <Scene
              key="calcInput"
              component={CalcInput}
              title="가계부😍 - 입력"
            />

            <Scene
              key="segment"
              component={SegmentExample}
              title="가계부😍 - 보기"
            />

            <Scene
              key="costmoney"
              component={Expense}
              title="Expense"

            />

            <Scene
              key="detail"
              path={"/list/:id"}
              component={Detail}
              title="가계부😍 - 상세페이지"
            />

            <Scene
              key="loginLightbox"
              component={loginLightbox}
              title="로그인"
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
    marginTop: 100,
    marginBottom: 50,
    fontSize: 40
  },
  cost: {
    marginTop: 30,
    marginBottom: 50,
    fontSize: 40,
  }
});

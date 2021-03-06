import React from 'react'
import { StyleSheet, Text, View, Alert, ScrollView, AsyncStorage, ActivityIndicato, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Left, Body, Right, Icon, Segment, Content, Button } from 'native-base';
import MonthSelectorCalendar from 'react-native-month-selector';

import MoneyContent from './MoneyContent';
import Loader from '../Loader/Loader'


export default class Income extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      isIndicator: true
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isIndicator: false }), 1500)
    this.getListData()
  }

  getListData() {
    console.log("kwontaehyoung")
    return fetch('http://127.0.0.1:8080/api/list/income')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          datas: responseJson,
        });

        return responseJson;

      }).catch((error) => {
        console.error(error);
      });
  }


  getListDataForMonth(month, year) {

    var monthNumb = Number(month) + 1

    if (monthNumb == 13) {
      monthNumb = 1
    }

    var monthString = "0" + monthNumb.toString()
    console.log(monthString);
    return fetch('http://127.0.0.1:8080/api/list/income/' + monthString + "/" + year)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          datas: responseJson,
        });

        console.log(this.state.datas);
        return responseJson;

      }).catch((error) => {
        console.error(error);
      });
  }

  async _calIncome(result) {
    await AsyncStorage.setItem("income", result.toString());
  }


  render() {

    let result = 0;
    let details = this.state.datas.map((data, index) => {
      const { date, _id, category, contents, price, etc, cc, receipt_img } = data;

      result = result + price

      return (
          <MoneyContent
            key={_id}
            num={index + 1}
            contents={contents}
            price={price}
            etc={etc}
            category={category}
            img={receipt_img}
            date={date}
          />
      );
    })

    this._calIncome(result);


    return (

      <View style={styles.container}>
        <Loader loading={this.state.isIndicator} />
        <Button style={[styles.topButtons]} full primary onPress={() => { this.getListData(); }} >
          <Text style={{ color: "white", paddingLeft: 10, paddingRight: 10 }}>
            전체 리스트 보기
          </Text>
        </Button>

        <MonthSelectorCalendar
          style={styles.monthCalendar}
          selectedDate={this.state.month}
          monthTapped={(date) => {

            this.setState({ month: date })

            var mon = date.toISOString().split("T")[0].split("-")[1]
            var year = date.toISOString().split("T")[0].split("-")[0]

            this.getListDataForMonth(mon, year);
          }}
        />

        <ScrollView style={styles.scroll} >
          {details}
        </ScrollView>

        <Text style={[styles.cost]}>수입 : {result}원</Text>
      </View>
    );
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
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});

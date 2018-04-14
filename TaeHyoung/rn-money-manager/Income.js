import React from 'react';
import { StyleSheet, Text, View, Button, Alert,ScrollView, AsyncStorage } from 'react-native';
import MoneyContent from './MoneyContent';

import GetMoney from './GetMoney'
import LostMoney from './LostMoney'
import { Actions } from 'react-native-router-flux';
import { Container, Header, Left, Body, Right,  Icon, Segment, Content } from 'native-base';


export default class Income extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    datas: [],
  };
}

componentDidMount() {
  this.getListData()
}

getListData() {
  return fetch('http://localhost:8080/api/list/income')
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

async _calIncome (result) {
  await AsyncStorage.setItem("income", result.toString());
}


  render() {
    
    let result = 0;
    let details = this.state.datas.map((data, index) => {
      const {date, _id, category, contents, price, etc, cc, receipt_img} = data;
      console.log(index);
      result = result + price

      return (
        <View>
            <MoneyContent
                id={_id}
                num={index + 1}
                contents={contents}
                price={price} 
                etc={etc}
                category={category}
                img={receipt_img}
                />

        </View>     
    );

    })

    this._calIncome(result);
    
    
    return (
      <View style={styles.container}>
                        
      <ScrollView style={styles.scroll} >
        {details}
      </ScrollView>

        {/* <Button title="Go lostmoney" onPress={()=>Actions.lostmoney()} />
             */}
        

      <Text style={[styles.cost]}>수입 : {result}원</Text>
      </View>
      );
  }
}
//<Text style={[styles.toptitle]}>{ cost_result }</Text>

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

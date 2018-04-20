import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, ListItem, Radio, Right, Picker, Textarea, Footer, FooterTab, Segment } from 'native-base';
const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';


import CalcInputExpense from './CalcInputExpense';
import CalcInputIncome from './CalcInputIncome';
import Stat from '../MoneyRecord/Stat';


export default class CalcInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeButton: "first"
    };
  }

  render() {
    return (
      <Container>

        <Segment>

          <Button first onPress={() => {
            console.log(this.state.activeButton);
            console.log(this.state.activeButton === 'first')
            this.setState({ activeButton: 'first' });
          }} active={this.state.activeButton === 'first'} >
            <Text>수입</Text>
          </Button>

          <Button second onPress={() => {
            console.log(this.state.activeButton);
            console.log(this.state.activeButton === 'second')
            this.setState({ activeButton: 'second' });
          }} active={this.state.activeButton === 'second'}  >
            <Text>지출</Text>
          </Button>


        </Segment>

        <Content padder>
          {this.state.activeButton === "first" ? <CalcInputIncome /> : <CalcInputExpense />}

        </Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  topButton: {
    height: 60,
    paddingTop: 10

  },

  bottomSide: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20

  }


});
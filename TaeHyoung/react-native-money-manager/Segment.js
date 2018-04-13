import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
import { Container,Title, Header, Left, Body, Right, Button, Icon, Segment, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux'

import LostMoney from './LostMoney'
import GetMoney from './GetMoney'
import Cost from './Cost'
import Income from './Income'
import Stat from './stat'


export default class SegmentExample extends Component {
    state = {
        activeButton: 'first',
        sometext: 'AweSome 1'
    }

    render() {
        return (
          <Container>
 
            <Segment>

                <Button first onPress={()=> {
                  console.log(this.state.activeButton);
                  this.setState({activeButton: 'first', sometext: 'first'});
                }} active={this.state.activeButton === 'first'} >
                <Text>수입</Text>
                </Button>

                <Button second onPress={()=> {
                  console.log(this.state.activeButton);
                  this.setState({activeButton: 'second', sometext: 'second'});
                }} active={this.state.activeButton === 'second'}  >
                <Text>지출</Text>
                </Button>

                <Button third onPress={()=> {
                  console.log(this.state.activeButton);
                  this.setState({activeButton: 'third', sometext: 'third'});
                }} active={this.state.activeButton === 'third'}  >
                <Text>통계</Text>
                </Button>              

            </Segment>
            <Content padder>
              
            {this.state.activeButton === 'first' ? <Income /> : 
                this.state.activeButton === 'second' ? <Cost /> : <Stat />}
              
            </Content>
          </Container>
        );
      }
    
}

const styles = StyleSheet.create({
    title: {
        fontSize:30,
    }
  });
  
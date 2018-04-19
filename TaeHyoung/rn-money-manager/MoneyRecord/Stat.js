import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native'
import { Container, Title, Header, Left, Body, Right, Button, Icon, Segment, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux'

import Expense from './Expense'
import Income from './Income'

import Loader from '../Loader/Loader'


export default class Stat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isIndicator: true
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ isIndicator: false}),1500)
        this._calResult();
    }

    async _calResult() {
        try {
            let cost_val = await AsyncStorage.getItem("cost");
            let income_val = await AsyncStorage.getItem("income");

            console.log(cost_val);

            this.setState({ rest_val: Number(income_val) - Number(cost_val) })

        }
        catch (error) {
            console.log(error);
        }

    }
    render() {

        return (
            <View style={[styles.container]}>
                <Loader loading={this.state.isIndicator} />
                <Text style={[styles.welcome]}>
                    잔액: {this.state.rest_val}
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', //자식 뷰 컴포넌트 간격에 영향을 준다.
        alignItems: 'center',
        backgroundColor: '#bb0000',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
});



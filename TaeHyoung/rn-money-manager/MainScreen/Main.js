import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'native-base';

import MoneyContent from '../MoneyRecord/MoneyContent';


export default class Main extends React.Component {



    componentDidMount() {
        setTimeout(
            () => {
                Actions.loginLightbox();
            },
            1000    // 2초
        );
    }

    render() {
        return (
        
            <View style={[styles.container]}>
                
                <View style={[styles.upper]}>
                    <Text style={[styles.bigTitle]}>
                        Money
                    </Text>

                    <Text style={[styles.bigTitle]}>
                        Management
                    </Text>
                    
                </View>

                <View style={[styles.buttonGroups]}>
                    <Button style={[styles.topButton]} primary onPress={() => { Actions.segment() }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", paddingHorizontal: 10 }}>가계부 보기</Text>
                    </Button>

                    <Button style={[styles.bottomButton]} primary onPress={() => { Actions.calcInput() }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", paddingHorizontal: 10 }}>가계부 입력</Text>
                    </Button>
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
        backgroundColor: '#f23e3e',
        //backgroundColor:'#fff'
    },
    upper: {
        flex: 2,
        alignItems: "center",
        justifyContent: 'center',
    },
    bigTitle: {
        fontSize: 50,
        fontWeight: "bold",
        color: "white",
    },
    buttonGroups: {
        flex: 1,
    },
    topButton: {
        marginBottom: 10
    },
    bottomButton: {
        marginTop: 10
    }

});

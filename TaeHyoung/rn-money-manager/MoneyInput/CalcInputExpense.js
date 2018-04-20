import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, ListItem, Radio, Right, Picker, Textarea, Footer, FooterTab } from 'native-base';
const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';

import { Segment } from '../MoneyRecord/Segment';




export default class CalcInputExpense extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected1: "",
            date: "",
            contents: "",
            price: 0,
            etc: ""
        };
    }
    onValueChange(value: string) {
        this.setState({
            selected1: value,
        });
    }

    _submitForm() {
        fetch('http://127.0.0.1:8080/api/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                date: this.state.date,
                contents: this.state.contents,
                price: this.state.price,
                etc: this.state.etc,
                category: this.state.selected1,
                cc: 0,
                cost: 1
            }),
        });
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Text> 지출 </Text>
                <View>
                    <Form>
                        <Item >
                            <Label>날짜</Label>
                            <Input onChangeText={(date) => this.setState({ date })} dataDetectorTypes={'calendarEvent'} autoFocus={true} />
                        </Item>

                        <Item >
                            <Label>내용</Label>
                            <Input onChangeText={(contents) => this.setState({ contents })} />
                        </Item>
                        <Item>
                            <Label>가격</Label>
                            <Input onChangeText={(price) => this.setState({ price })} />
                        </Item>
                        <Item>
                            <Label>etc</Label>

                            <Textarea onChangeText={(etc) => this.setState({ etc })} style={{ width: deviceWidth }} bordered placeholder="기타사항을 입력하세요" />

                        </Item>

                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            placeholder="카테고리를 고르시오!! ▼"
                            placeholderStyle={{ color: "#bha6ea" }}
                            selectedValue={this.state.selected1}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="간식" value="간식" />
                            <Picker.Item label="옷" value="옷" />
                            <Picker.Item label="술" value="술" />
                            <Picker.Item label="식대" value="식대" />
                            <Picker.Item label="기타" value="기타" />
                        </Picker>
                    </Form>
                </View>

                <View style={[styles.bottomSide]}>
                    <Button style={[styles.topButton]} full primary onPress={() => { this._submitForm(); Actions.segment(); }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>작성 완료</Text>
                    </Button>
                </View>


            </View>

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
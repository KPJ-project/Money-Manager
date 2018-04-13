import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
export default class CalcInput extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>날짜</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>카테고리</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>내용</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>가격</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>etc</Label>
              <Input />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
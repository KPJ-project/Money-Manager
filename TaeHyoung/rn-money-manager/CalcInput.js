// import React, { Component } from 'react';
// import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
// export default class CalcInput extends Component {
//   render() {
//     return (
//       <Container>
//         <Header />
//         <Content>
//           <Form>
//             <Item floatingLabel>
//               <Label>날짜</Label>
//               <Input />
//             </Item>
//             <Item floatingLabel last>
//               <Label>카테고리</Label>
//               <Input />
//             </Item>
//             <Item floatingLabel>
//               <Label>내용</Label>
//               <Input />
//             </Item>
//             <Item floatingLabel last>
//               <Label>가격</Label>
//               <Input />
//             </Item>
//             <Item floatingLabel>
//               <Label>etc</Label>
//               <Input />
//             </Item>
//           </Form>
//         </Content>
//       </Container>
//     );
//   }
// }

import React, { Component } from 'react'
import {
  DatePickerIOS,
  View,
  StyleSheet,
  Text
} from 'react-native'

import { Picker, DatePicker } from 'react-native-wheel-datepicker';
import MonthSelectorCalendar from 'react-native-month-selector';

export default class CalcInput extends Component {
  constructor(props) {
    super(props);
    this.state = { currentDate: new Date() };

    //this.setDate = this.setDate.bind(this);
  }

  handleDateChange = currentDate => this.setState({ currentDate });

  render() {
    return (
      <View style={styles.container}>



      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
})
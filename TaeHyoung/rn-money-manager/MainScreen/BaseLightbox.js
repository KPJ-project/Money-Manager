import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated, Dimensions, Button, TouchableHighlight, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export default class BaseLightbox extends Component {
  static propTypes = {
    children: PropTypes.any,
    horizontalPercent: PropTypes.number,
    verticalPercent: PropTypes.number,
  }

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      duration: 100,
      toValue: 1,
    }).start();
  }

  closeModal = () => {
    Animated.timing(this.state.opacity, {
      duration: 100,
      toValue: 0,
    }).start(Actions.pop);
  }

  _renderLightBox = () => {
    const { children, horizontalPercent = 1, verticalPercent = 1 } = this.props;
    const height = verticalPercent ? deviceHeight * verticalPercent : deviceHeight;
    const width = horizontalPercent ? deviceWidth * horizontalPercent : deviceWidth;
    return (
      <View

      >
        <View>
          <View style={{

            backgroundColor: 'white',
            flexDirection: 'row',


            justifyContent: 'space-around'
          }}>

            <View style={[styles.topleft]}>
              <TouchableHighlight onPress={() => {

                this.closeModal()
              }}>
                <Text style={[styles.neveragain]}>다시보지 않기</Text>
              </TouchableHighlight>
            </View>


            <View style={[styles.topRight]}>
              <TouchableHighlight onPress={() => {
                this.closeModal()
              }}>
                <Text style={[styles.closeButton]}>닫기</Text>
              </TouchableHighlight>
            </View>
          </View>

          {/* <Image style={[styles.eventImage]} source={require('./event.png')} /> */}

          <Image style={{
            width,
            height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }} source={require('../images/event.png')} />

        </View>

      </View>



    );
  }

  render() {
    return (
      <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>
        {this._renderLightBox()}
      </Animated.View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52,52,52,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 30
  },


  topleft: {
    alignItems: "flex-start",

  },
  topRight: {
    alignItems: "flex-end",

  },
  neveragain: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,

  },
  closeButton: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderLeftColor: "black",
    borderRightColor: "black",
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },
  eventImage: {

    width: deviceWidth,
    height: deviceHeight - 80,
    // marginLeft: 10,
    // marginRight: 10,
    // marginTop:10,
    // marginBottom:10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },

});
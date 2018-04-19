import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  View,
  Text,
  StyleSheet
} from 'react-native';
import Animation from 'lottie-react-native';
import { Actions } from 'react-native-router-flux';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default class Loading extends Component {

  state = {
    // Used by Animation component to run animation
    progress: new Animated.Value(0),
  };

  componentDidMount() {
    // Wait for 1 second before starting animation
    this.animate();
  }

  animate = () => {   
    Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.progress,{
            // Change from 0 to 1 to run animation
            toValue: 1,
            // Animation duration
            duration: 2400, // higher the value slower the animation and vice versa
            // Linear easings
          }),
        ]),
        {
          iterations: 2
        }
      ).start(() => {
      // Reset progress to zero after animation is done
      //this.state.progress.setValue(0);
      // Animate again
      Actions.mainPage();
     
    });
  }

  render() {
    return (
    <View style={styles.container}>
      <Animation
        // Load animation from json file
        source={require('../lottie/loading...json')}
        // Animate json file
        progress={this.state.progress}
      />    
      
    <Text style={[styles.bigTitle]}>
        로딩 중..
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
        backgroundColor: '#f23e3e',
        //backgroundColor:'#fff'
    },

    bigTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});

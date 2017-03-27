import React, { Component } from 'react';
const Button = require('react-native-button');
import {
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

const {
    Accelerometer
} = require('NativeModules');


Accelerometer.setAccelerometerUpdateInterval(0.1);

class AccelerometerManager extends Component {
  constructor(props){
      super(props);
      this.state = {
        x: 0,
        y: 0,
        z: 0,
        gyro: false
      };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('AccelerationData', function (data) {
      this.setState({
        x: data.acceleration.x.toFixed(5),
        y: data.acceleration.y.toFixed(5),
        z: data.acceleration.z.toFixed(5)
      });
    }.bind(this));
  }

  componentWillUnmount() {
    Accelerometer.stopAccelerometerUpdates();
  }

  handleStart() {
    Accelerometer.startAccelerometerUpdates();
    this.setState({
      gyro: true
    });
  }

  handleStop() {
    Accelerometer.stopAccelerometerUpdates();
    this.setState({
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    });
  }

  render() {
    return (
      <View
        style = {{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>x: {this.state.x}</Text>
        <Text>y: {this.state.y}</Text>
        <Text>z: {this.state.z}</Text>
        {
          (this.state.gyro) ?
            <Button
              style = {{ color: 'red', margin: 20 }}
              onPress={this.handleStop}>Stop</Button> :
            <Button
              style = {{ color: 'green', margin: 20 }}
              onPress = { this.handleStart }>Start</Button>
        }
      </View>
    );
  }
}

module.exports = AccelerometerManager;

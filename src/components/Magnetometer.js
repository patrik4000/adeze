import React, { Component } from 'react';
const Button = require('react-native-button');
import {
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

const {
    Magnetometer
} = require('NativeModules');


Magnetometer.setMagnetometerUpdateInterval(0.1);

class MagnetometerManager extends Component {
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
    DeviceEventEmitter.addListener('MagnetometerData', function (data) {
      this.setState({
        x: data.magneticField.x.toFixed(5),
        y: data.magneticField.y.toFixed(5),
        z: data.magneticField.z.toFixed(5)
      });
    }.bind(this));
  }

  componentWillUnmount() {
    Magnetometer.stopMagnetometerUpdates();
  }

  handleStart() {
    Magnetometer.startMagnetometerUpdates();
    this.setState({
      gyro: true
    });
  }

  handleStop() {
    Magnetometer.stopMagnetometerUpdates();
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
              onPress = { this.handleStop }>Stop</Button> :
            <Button
              style = {{ color: 'green', margin: 20 }}
              onPress = { this.handleStart }>Start</Button>
        }
      </View>
    );
  }
}

module.exports = MagnetometerManager;

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  Button,
  Text,
  DeviceEventEmitter
} from 'react-native';
import Camera from 'react-native-camera';
import { SensorManager } from 'NativeModules';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class ARScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      x: deviceWidth / 4,
      y: deviceHeight / 4,
      z: 0,
      gyro: false
    };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('Gyroscope', (data) => {
      this.setState({
        x: this.state.x + Math.ceil(data.x * 10),
        y: this.state.y + Math.ceil(data.y * 10),
        z: this.state.z + Math.ceil(data.z * 10),
      });
      console.log(data);
    });
  }

  componentWillUnmount() {
    SensorManager.stopGyroscope();
  }

  handleStart() {
    SensorManager.startGyroscope(0.1);
    this.setState({
      gyro: true
    });
  }

  handleStop() {
    SensorManager.stopGyroscope();
    this.setState({
      x: deviceWidth / 4,
      y: deviceHeight / 4,
      z: 0,
      gyro: false
    });
  }

  render() {
    const image = {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      height: deviceHeight / 2,
      width : deviceWidth / 2,
      top: this.state.x,
      right: this.state.y
    };

    return (
      <Camera
        ref = {(cam) => {
          this.camera = cam;
        }}
        style = { styles.preview }
        aspect = { Camera.constants.Aspect.fill }>
        <Image
          source = { require('./iv.jpg') }
          style = { image } />
        <Text>x: {this.state.x}</Text>
        <Text>y: {this.state.y}</Text>
        <Text>z: {this.state.z}</Text>
        {
          (this.state.gyro) ?
            <Button
              title = 'Stop'
              style = {{ color: 'red', margin: 20 }}
              onPress = {() => this.handleStop()} >Stop</Button> :
            <Button
              title = 'Start'
              style = {{ color: 'green', margin: 20 }}
              onPress = { () => this.handleStart() }>Start Android</Button>
        }
      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
  }
});

module.exports = ARScreen;

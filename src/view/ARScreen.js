import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import Camera from 'react-native-camera';

class ARScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Camera
        ref = {(cam) => {
          this.camera = cam;
        }}
        style = { styles.preview }
        aspect = { Camera.constants.Aspect.fill }>
        <Text style = { styles.video }>VIDEO</Text>
      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1
  },
  video: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
    bottom: 100,
    left: 50,
    right: 50
  }
});

module.exports = ARScreen;

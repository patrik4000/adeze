import React, { Component } from 'react';
import {
  StyleSheet,
  Image
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
        <Image
          source = { require('./iv.jpg') }
          style = { styles.image } />
      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 500,
    top: 70,
    bottom: 100,
    right: 40,
    left: 50
  }
});

module.exports = ARScreen;

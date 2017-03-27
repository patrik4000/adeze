import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform
} from 'react-native';
import Camera from 'react-native-camera';

export default class MarinaQR extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  barcodeReceived() {
    if (Platform.OS === 'ios' ){
      this.props.navigaton.push({ name: 'gyroscope_ios' });
    }
    else {
      this.props.navigaton.push({ name: 'ar_screen' });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref = { ( cam ) => {
            this.camera = cam;
          }}
          style = { styles.preview }
          onBarCodeRead = { () => this.barcodeReceived() }
          aspect = { Camera.constants.Aspect.fill }>
          <Text style = { styles.capture }>Skenirajte QR kod</Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'grey',
    borderRadius: 2,
    color: 'white',
    padding: 5,
    margin: 30
  }
});

module.exports = MarinaQR;

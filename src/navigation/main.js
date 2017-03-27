import React, { Component } from 'react';
import {
  View,
  Image } from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';

export default class MarinaQR extends Component {
  constructor(props){
    super(props);
    this.state = {
      torchMode: 'off',
      cameraType: 'back'
    };
  }

  barcodeReceived() {
    <View>
      <Image
        source = { require('./img/iv.jpg') }
        style = { styles.image } />
    </View>;
    }

  render() {
    return (
      <BarcodeScanner
        onBarCodeRead = { this.barcodeReceived }
        style = {{ flex: 1 }}
        torchMode = { this.state.torchMode }
        cameraType = { this.state.cameraType } />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 100,
    bottom: 100,
    left: 50,
    right: 50
  }
});

module.exports = MarinaQR;

import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  StatusBar
} from 'react-native';

const QRScanner = require('./src/view/QRScanner');
const ARScreen = require('./src/view/ARScreen');
const GyroscopeiOS = require('./src/components/GyroscopeiOS');

const ROUTES = {
  qr_scanner: QRScanner,
  ar_screen: ARScreen,
  gyroscope_ios: GyroscopeiOS 
};

export default class MarinaQR extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  renderScene(route, navigation) {
    const Scene = ROUTES[route.name];
    return <Scene route = { route } navigaton = { navigation } root = { this } />;
  }

  render() {
    StatusBar.setHidden(true);
    return (
      <Navigator
        style = { styles.container }
        ref = { (nav) => this.navigation = nav }
        initialRoute = {{ name: 'qr_scanner' }}
        renderScene = { this.renderScene.bind(this) }
        configureScene = {() => Navigator.SceneConfigs.FloatFromRight } />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = MarinaQR;

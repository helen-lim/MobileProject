'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import Styles from './cards/Styles.js';
import CardStack from './cards/CardStack.js';

export default class BrowseScreen extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text style={{ fontWeight: '700', fontSize: 30, color: 'gray', marginTop: 50, paddingTop: 30 }}>Swipe Left or Right!</Text>
        <CardStack/>
      </View>
    );
  }
}
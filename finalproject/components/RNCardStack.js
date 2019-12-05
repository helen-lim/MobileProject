'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import Styles from './cards/Styles.js';
import CardStack from './cards/CardStack.js';

export default class RNCardStack extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <CardStack/>
      </View>
    );
  }
}
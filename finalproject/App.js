import * as React from 'react';
import { useState, useEffect } from 'react';
import { Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Carousel from 'simple-carousel-react-native';
import { Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker'; 
import { storage, database } from './components/Firebase';
import HomeScreen from './components/HomeScreen';
import LikedScreen from './components/LikedScreen';
import UserScreen from './components/UserScreen';``

const TabNavigator = createBottomTabNavigator({
  User: { screen: UserScreen},
  Home: { screen: HomeScreen },
  Liked: { screen: LikedScreen },
  },{
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: 'black',
      activeBackgroundColor: '#87ceeb',
      inactiveBackgroundColor: '#a8ddf3',
      labelStyle: {
        fontSize: 16,
        paddingBottom: 10,
      },
      style: {
        justifyContent: 'center',
      },
    }
  }
);

export default createAppContainer(TabNavigator);

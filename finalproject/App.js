import * as React from 'react';
import { useState, useEffect } from 'react';
import { Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LikedScreen from './components/LikedScreen';
import UserScreen from './components/UserScreen';
import LoadingScreen from './components/login/Loading'
import SignUpScreen from './components/login/SignUp'
import LoginScreen from './components/login/Login'
import firebase from 'firebase'
import MapScreen from './components/MapScreen';
import BrowseScreen from './components/BrowseScreen';

const TabNavigator = createBottomTabNavigator({
  User: { screen: UserScreen },
  Home: { screen: BrowseScreen },
  Liked: { screen: LikedScreen },
  Map: { screen: MapScreen },
  }, 
  {
    initialRouteName : 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return (
            <Image
              source={ require('./assets/home.png') }
              style={{ width: 20, height: 20, }} />
          );
        } 
        else if (routeName === 'Liked') {
          return ( <Image source = {require('./assets/liked.png')} style = {{width:25, height:25}} />)
        }
        else if (routeName === 'User') {
          return ( <Image source = {require('./assets/user.png')} style = {{width:20, height:20}} />)
        }
        else if (routeName === 'Map') {
          return ( <Image source = {require('./assets/location.png')} style = {{width:20, height:20}} />)
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#2a9d84',
      inactiveTintColor: '#264653',
      style: {
        backgroundColor: '#ffffff'
      } 
    },
  },

);

const HomeScreenStack = createStackNavigator({
    SignUp: { screen: SignUpScreen },
    Login: { screen: LoginScreen },
    Main: { screen: TabNavigator, navigationOptions : { header: null} }
}, {
    initialRouteName: 'SignUp',
    defaultNavigationOptions: {
      header: () => <HeaderStyle />
      // headerTitle: 'memes',
      // headerLeft: null, // removes back button
      // headerStyle: {backgroundColor: '#76abd9'},
      // headerTitleStyle: {fontWeight: "300", fontSize: 20}
    },
})

class HeaderStyle extends React.Component {
  render() {
    return (
        <View style = {styles.headerContainer}>
          <View style = {styles.shadowContainer}>
            <Text style = {styles.shadow}>
              memes
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style = {styles.text}>
              memes
            </Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer : {
    paddingTop: 30,
    flex:1,
    justifyContent : 'center',
    alignItems : 'center',
    width : '100%',
    height : '30%',
    backgroundColor : '#F5B988',
  },
  textContainer : {

  },
  imageContainer : {
    position: 'absolute',
    left: 250,
    top: 35

  },
  imageStyle : {
    width: 25,
    height: 26,
  },
  shadowContainer : {
    position : 'absolute',
    width: '100%',
    height: '100%',
    justifyContent : 'center',
    alignItems : 'center',
    left: -2,
    top: 30.5,
  },
  shadow: {
    fontSize : 35,
    fontStyle : 'italic',
    color : '#FF8119',
  },
  text : {
    fontSize : 35,
    fontStyle : 'italic',
    color : '#423D39',
  }
})

//const styles = StyleSheet.create({})

/**
 * Launch Point of Application
 */
export default createAppContainer(HomeScreenStack)

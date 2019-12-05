import * as React from 'react';
import { useState, useEffect } from 'react';
import { Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Carousel from 'simple-carousel-react-native';
import { Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker'; 
import { storage, database } from './components/Firebase';
import HomeScreen from './components/HomeScreen';
import LikedScreen from './components/LikedScreen';
import UserScreen from './components/UserScreen';
import LoadingScreen from './components/login/Loading'
import SignUpScreen from './components/login/SignUp'
import LoginScreen from './components/login/Login'
import firebase from 'firebase'
import MapScreen from './components/MapScreen';
import RNCardStack from './components/RNCardStack';

const TabNavigator = createBottomTabNavigator({
  User: { screen: UserScreen },
  Home: { screen: HomeScreen },
  Liked: { screen: LikedScreen },
  Map: { screen: MapScreen },
  TEMP: { screen: RNCardStack },
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
    },
  },

);

const HomeScreenStack = createStackNavigator({
    Loading: { screen: LoadingScreen },
    SignUp: { screen: SignUpScreen },
    Login: { screen: LoginScreen },
    Main: { screen: TabNavigator,
      navigationOptions: {
        headerLeft: () => (
          <Text style={{ color: '#495054' }}>Logout</Text>
          // <Button
          //   onPress={() => 
          //     firebase.auth().signOut()
          //     .then(function() {
          //       // Sign-out successful.
          //     })
          //     .catch(function(error) {
          //       // An error happened
          //     })}
          //   title="Logout"
          // />
        ),
        headerRight: () => (
          <Text style={{ color: '#495054' }}>Logout</Text>
        ),
      } 
    }
}, {
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
      header: () => <HeaderStyle />
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

          <View style={styles.imageContainer}>
              <Image source={require('./assets/liked.png')} style = {styles.imageStyle} />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer : {
    justifyContent : 'center',
    alignItems : 'center',
    width : '100%',
    height : '10%',
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
    top: -1.5,
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

/*

      title: 'memes',
      headerTintColor: '#e3e8ea',
      headerStyle: {
        backgroundColor: '#495054',
      },
      headerTitleStyle: {
        flex: 1, 
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontStyle: 'italic',
        fontSize: 30
      },
      headerLeft: () => (
        <Text style={{ color: '#495054' }}>Logout</Text>
      ),
      headerRight: () => (
        <Text style={{ color: '#495054' }}>Logout</Text>
      ),
*/

export default createAppContainer(HomeScreenStack)
//export default createAppContainer(TabNavigator);

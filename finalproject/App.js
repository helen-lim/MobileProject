import * as React from 'react';
import { Image, Button, Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Carousel from 'simple-carousel-react-native';
import Upload from './components/UserScreen';
import { Card } from 'react-native-paper';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headertext}> MemeDer </Text>
          </View>
          <View style={styles.subcontainer1}>
            <Carousel color='black' height={300} showBubbles={true} >
              <View style={styles.subcontainer2}>
                <Image style={styles.memeimage} source={require('./assets/pepe.jpg')} resizeMode="contain"/>
              </View>
              <View style={styles.subcontainer2}>
                <Image style={styles.memeimage} source={require('./assets/womanyellingcat.jpg')} resizeMode="contain"/>
              </View>
              <View style={styles.subcontainer2}>
                <Image style={styles.memeimage} source={require('./assets/galaxybrain.jpg')} resizeMode="contain"/>
              </View>
            </Carousel> 
            <Text style={styles.paragraph}>
              Your Memes
            </Text>
          </View>
        </View>
    );
  }

}

class LikedScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <Text style={styles.headertext}> MemeDer </Text>
            </View>
            <Text style={styles.paragraph}>
              Liked Page
            </Text>
          </View>
          <View style={styles.subcontainer1}>
            <Text style={styles.paragraph}>
              Your Memes
            </Text>
          </View>
        </View>
    );
  }
}

class UserScreen extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <Text style={styles.headertext}> MemeDer </Text>
            </View>
            <Text style={styles.paragraph}>
              Profile Page
            </Text>
            <Card>
              <Upload />
            </Card>
          </View>
          <View style={styles.subcontainer1}>
            <Text style={styles.paragraph}>
              Your Memes
            </Text>
          </View>
        </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  User: { screen: UserScreen},
  Home: { screen: HomeScreen },
  Liked: { screen: LikedScreen },
  },{
    tabBarOptions: {
      activeTintColor: 'black',
      labelStyle: {
        fontSize: 16,
      },
      style: {
        backgroundColor: 'skyblue',
      },
    }
  }
);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
  },
  subcontainer1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },  
  subcontainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'black',
  }, 
  memeimage: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    height: undefined,
  },
  header:{
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    paddingHorizontal: '10%',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  headertext: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
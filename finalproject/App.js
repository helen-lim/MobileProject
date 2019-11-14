import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// You can import from local files
import Upload from './components/UserScreen';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Swiping Screen</Text>
      </View>
    );
  }

}

class LikedScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Liked Screen</Text>
      </View>
    );
  }
}
class UserScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <Text style={styles.headertext}> Memeder </Text>
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
        fontSize: 20,
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
    justifyContent: 'space-between',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  subcontainer1: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
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
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
import * as React from 'react';
import { Image, Button, Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Carousel from 'simple-carousel-react-native';
import Upload from './components/UserScreen';
import { Card } from 'react-native-paper';
import firebase from 'firebase';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headertext}> MemeDer </Text>
          </View>
          <View style={styles.subcontainer1}>
            <Carousel color='black' height={300} showBubbles={false} >
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
          </View>
          <View style={styles.subcontainer1}>
            <Text style={styles.paragraph}>
              Liked Memes
            </Text>
            <ScrollView style={{marginHorizontal: 30, width: '90%', height: 400,}} >
              <View style={styles.subcontainer3}>
                <Image style={styles.listimage} source={require('./assets/pepe.jpg')}/>
              </View>
              <View style={styles.subcontainer3}>
                <Image style={styles.listimage} source={require('./assets/womanyellingcat.jpg')} resizeMode="contain"/>
              </View>
              <View style={styles.subcontainer3}>
                <Image style={styles.listimage} source={require('./assets/galaxybrain.jpg')} resizeMode="contain"/>
              </View>
            </ScrollView>
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
            <Card>
              <Upload/>
            </Card>
          </View>
          <View style={styles.subcontainer1}>
            <Text style={styles.paragraph}>
              Submitted Memes
            </Text>
            <ScrollView style={{marginHorizontal: 30, width: '90%', height: 400,}} >
              <View style={styles.subcontainer3}>
                <Image style={styles.listimage} source={require('./assets/pepe.jpg')}/>
              </View>
              <View style={styles.subcontainer3}>
                <Image style={styles.listimage} source={require('./assets/womanyellingcat.jpg')} resizeMode="contain"/>
              </View>
              <View style={styles.subcontainer3}>
                <Image style={styles.listimage} source={require('./assets/galaxybrain.jpg')} resizeMode="contain"/>
              </View>
            </ScrollView>
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
  }, 
  subcontainer3: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  }, 
  memeimage: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    height: undefined,
  },
  listimage: {
    flex: 1,
    alignSelf: 'stretch',
    width: 300,
    height:300,
  },
  header:{
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87ceeb',
  },
  headertext: {
    fontSize: 18,
    letterSpacing: 2,
    color: '#414a4e',
    fontWeight: 'bold',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { useState, useEffect } from 'react';
import { storage, database } from './Firebase';
import firebase from 'firebase'
import { Gyroscope, Accelerometer, DeviceMotion } from 'expo-sensors';
import { tsConstructSignatureDeclaration } from '@babel/types';

export default class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      deviceMotionData: {},
      unseenMemes: [],
      currentUser: null,
    };
  };
  
  componentDidMount() {
    this._toggle();

    this.setState({ currentUser: firebase.auth().currentUser})

    database.ref('memes/').on('value', function(snapshot) {
      let parseObject = snapshot.val();
      var result = [];
      for(var i in parseObject) {
        result.push(parseObject[i]);
      }
      this.setState({ unseenMemes: result });
    }.bind(this), function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })
  }
 
  componentWillUnmount() {
    this._unsubscribe();
  }
 
  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };
 
  _slow = () => {
    DeviceMotion.setUpdateInterval(1000);
  };
 
  _fast = () => {
    DeviceMotion.setUpdateInterval(16);
  };
 
  _subscribe = () => {
    this._subscription = DeviceMotion.addListener(result => {
      this.setState({ deviceMotionData: result });
    });
  };
 
  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  likeMeme = async (name, user, uid) => {
    var result = [];
    database.ref('memes/' + uid + '/liked').on('value', function(snapshot) {
      let parseObject = snapshot.val();
      var exists = false;
      for(var i in parseObject) {
        if(parseObject[i] == user){
          exists = true;
        }
        if(exists == false){
          result.push(parseObject[i]);
        }
      };
    })
    result.push(user)
    var likedRef = database.ref('memes/' + uid + '/liked');
    likedRef.set(result);

    database.ref('memes/' + uid + '/seen').on('value', function(snapshot) {
      let parseObject = snapshot.val();
      var exists = false;
      for(var i in parseObject) {
        if(parseObject[i] == user){
          exists = true;
        }
        if(exists == false){
          result.push(parseObject[i]);
        }
      };
    })
    result.push(user)
    var seenRef = database.ref('memes/' + uid + '/seen');
    seenRef.set(result);
  }

  dislikeMeme = async (name, user, uid) => {
    database.ref('memes/' + uid + '/seen').on('value', function(snapshot) {
      let parseObject = snapshot.val();
      var exists = false;
      for(var i in parseObject) {
        if(parseObject[i] == user){
          exists = true;
        }
        if(exists == false){
          result.push(parseObject[i]);
        }
      };
    })
    result.push(user)
    var seenRef = database.ref('memes/' + uid + '/seen');
    seenRef.set(result);
  }
 
  render() {
    let data = this.state.deviceMotionData;
    let rotate = {}
    for (var value in data.rotate){
      rotate[value] = data.rotate[value];
    }
    return (
      <View style={{ flex: 1 }}>
        <CardStack
          style={styles.content}
          renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text>}
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwiped={() => console.log('onSwiped')}
          onSwipedLeft={() => console.log('onSwipedLeft')}
          onSwipedRight={() => console.log('onSwipedRight')}
        >
          {this.state.unseenMemes.filter((meme) => {
            for(var i in meme.seen) {
              if(meme.seen[i] == (this.state.currentUser && this.state.currentUser.uid)){
                return false
              }
            }
            return true
          }).map((meme, index) => (
            <Card key={index} style={[styles.card, styles.card1]} onSwipedLeft={() => this.likeMeme(meme.name, (this.state.currentUser && this.state.currentUser.uid), meme.uid)} onSwipedRight={() => this.likeMeme(meme.name, (this.state.currentUser && this.state.currentUser.uid), meme.uid) }>
              <Image style={styles.listimage} source={{uri : meme.link }}/>
              <Text style={styles.memeText}>{meme.name}</Text>
            </Card>
          ))}
        </CardStack>
 
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.red]} onPress={() => {
              this.swiper.swipeLeft();
            }}>
              <Text style = {styles.buttonTextStyle}>noo :(</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
              this.swiper.swipeRight();
            }}>
              <Text style = {styles.buttonTextStyle}>yaaas :)</Text>  
            </TouchableOpacity>
          </View>
 
        </View>
      </View>
    );
  }
};
function round(n) {
  if (!n) {
    return 0;
  }
 
  return Math.floor(n * 100) / 100;
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  memeText : {
    fontSize : 15,
    fontStyle : 'italic',
    color : '#423D39',

    textAlign : 'center'
  },
  buttonTextStyle : {
    fontSize : 15,
    fontStyle : 'italic',
    color : '#423D39',

    textAlign : 'center'
  },
  content:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    width: 320,
    height: 470,
    backgroundColor: '#F5B988',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  card1: {
    backgroundColor: '#F5B988',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  footer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer:{
    width:220,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 0,
  },
  orange:{
    width:55,
    height:55,
    borderWidth:6,
    borderColor:'rgb(246,190,66)',
    borderRadius:55,
    marginTop:-15
  },
  green:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:6,
    borderColor:'#01df8a',
  },
  red:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:6,
    borderColor:'#fd267d',
  },
  listimage: {
    flex: 1,
    alignSelf: 'stretch',
    width: 320,
    height: 470,
  },
});

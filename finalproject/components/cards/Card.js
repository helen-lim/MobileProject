'use strict';
import React, { Component } from 'react';
import {
  PanResponder,
  Animated,
  View,
  Image,
  Text,
} from 'react-native';
import Styles from './Styles.js';
import { database } from '../Firebase';
import firebase from 'firebase'


export default class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      currentUser: firebase.auth().currentUser,
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y}
      ]),
      onPanResponderRelease: (e, {vx, vy}) => {
        if (this.state.pan.x._value < -150) {
          this.dislikeMeme(this.props.memeID);
          this.props.onSwipe(this.props.index)
        } else if (this.state.pan.x._value > 150) {
          this.likeMeme(this.props.memeID);
          this.props.onSwipe(this.props.index)
        } else {
          Animated.spring(this.state.pan, {
            toValue: 0,
          }).start()
        }
      }
    });
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  getMainCardStyle() {
    let {pan} = this.state;
    return [
      Styles.mainCard,
      {position: 'absolute'},
      {left: -175},
      {top: -250},
      {transform: [{translateX: pan.x}, {translateY: pan.y},
      {rotate: pan.x.interpolate({inputRange: [-150, 0, 150], outputRange: ["-20deg", "0deg", "20deg"]})}]},
      {opacity: pan.x.interpolate({inputRange: [-150, 0, 150], outputRange: [0.5, 1, 0.5]})}
    ];
  }

  likeMeme = async (memeID) => {
    var resultLikedBy = [];
    var resultSeenBy = [];

    // Get all users who LIKED the meme
    database.ref('memes/' + memeID + '/likedBy').on('value', function(snapshot) {
      let likedBy = snapshot.val();
      for (var index in likedBy) {
        resultLikedBy.push(likedBy[index]);
      };
    });

    // Get all users who have SEEN the meme
    database.ref('memes/' + memeID + '/seenBy').on('value', function(snapshot) {
      let seenBy = snapshot.val();
      for (var index in seenBy) {
        resultSeenBy.push(seenBy[index]);
      };
    });

    // Add user to list
    resultLikedBy.push(this.state.currentUser.uid);
    resultSeenBy.push(this.state.currentUser.uid);

    // References to Firebase
    var likedRef = database.ref('memes/' + memeID + '/likedBy');
    var seenRef = database.ref('memes/' + memeID + '/seenBy');

    // Save to Firebase
    likedRef.set(resultLikedBy);
    seenRef.set(resultSeenBy);
    console.log("Like Saved to Firebase")
  }

  dislikeMeme = async (memeID) => {
    var resultDislikedBy = [];
    var resultSeenBy = [];

    // Get all users who LIKED the meme
    database.ref('memes/' + memeID + '/dislikedBy').on('value', function(snapshot) {
      let dislikedBy = snapshot.val();
      for (var index in dislikedBy) {
        resultDislikedBy.push(dislikedBy[index]);
      };
    });

    // Get all users who have SEEN the meme
    database.ref('memes/' + memeID + '/seenBy').on('value', function(snapshot) {
      let seenBy = snapshot.val();
      for (var index in seenBy) {
        resultSeenBy.push(seenBy[index]);
      };
    });

    // Add user to list
    resultDislikedBy.push(this.state.currentUser.uid);
    resultSeenBy.push(this.state.currentUser.uid);

    // References to Firebase
    var dislikedRef = database.ref('memes/' + memeID + '/dislikedBy');
    var seenRef = database.ref('memes/' + memeID + '/seenBy');
    console.log("memes/{memeID}/seenBy Reference: " + seenRef);

    // Save to Firebase
    dislikedRef.set(resultDislikedBy);
    seenRef.set(resultSeenBy);
    console.log("Dislike Saved to Firebase")
  }

  render() {
    let {memeID, name, link, deviceShook} = this.props;
    return (
      <Animated.View style={this.getMainCardStyle()} {...this.panResponder.panHandlers}>
        <View style={Styles.card}>
          <Image source={{uri: link}} style={Styles.cardImage}/>
          <View style={Styles.cardText}>
          <Text style={Styles.cardTextMain}>{name}</Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}

import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { database } from './Firebase';
import firebase from 'firebase'

export default class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      allMemes: [],
      currentUser: null,
    };
  };
  
  componentDidMount() {
    this.setState({ currentUser: firebase.auth().currentUser })

    // Clear existing Array
    this.state.allMemes.length = 0;

    database.ref('memes/').on('value', function(snapshot) {

      // fetch all memes
      let parseObject = snapshot.val();
      var results = [];
      for(var i in parseObject) {
        results.push(parseObject[i]);
      }

      // filter out memes already seen by the user
      results = results.filter((meme) => {
        for (var i in meme.seenBy) {
          console.log(i + "           INSIDE COMPONENTDIDMOUNT(): " + "(meme.seen[i] === this.state.currentUser.uid) is... " + (meme.seenBy[i] === this.state.currentUser.uid))
          if (meme.seenBy[i] === this.state.currentUser.uid) {
            return false
          }
        }
        return true
      })

      // Update State
      this.setState({ allMemes: results })
      console.log("setState() called")

    }.bind(this), function (errorObject) {
      console.log("componentDidMount: The read failed: " + errorObject.code);
    })
  }

  /**
   * Saves to Firebase that a user liked a meme
   */
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

  /**
   * Saves to Firebase that a user disliked a meme
   */
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
    return (
      <View style={{ flex: 1 }}>
        <CardStack
          style={styles.content}
          renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text>}
          ref={swiper => { this.swiper = swiper }}
        >
          {this.state.allMemes.map((meme, index) => {
            console.log(index + "   INSDE RENDER(): " + JSON.stringify(meme))
            return (
              <Card 
                key={index} style={[styles.card, styles.card1]} 
                onSwipedLeft={() => this.dislikeMeme(meme.memeID)} 
                onSwipedRight={() => this.likeMeme(meme.memeID)}
              >
                <Image style={styles.listimage} source={{uri : meme.link }}/>
                <Text style={styles.memeText}>{meme.name}</Text>
              </Card>
            )
          })}
        </CardStack>
 
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.red]} onPress={() => {
              console.log("Dislike Button Pressed");
              this.swiper.swipeLeft();
            }}>
              <Text style = {styles.buttonTextStyle}>noo :(</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
              console.log("Like Button Pressed");
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

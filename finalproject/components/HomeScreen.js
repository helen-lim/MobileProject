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
      unseenMemes: [],
      currentUser: null,
    };
  };
  
  componentDidMount() {
    this.setState({ currentUser: firebase.auth().currentUser})

    database.ref('memes/').on('value', function(snapshot) {

      // fetch new memes
      let parseObject = snapshot.val();
      var newResults = [];
      for(var i in parseObject) {
        newResults.push(parseObject[i]);
      }

      // current memes list empty
      if (this.state.unseenMemes.length == 0) {
        this.setState({ unseenMemes: newResults })
        console.log("setState() b/c unseenMemes empty")
      }

      // only setState() if new memes came in
      for (var i in newResults) {

        var newMemeFound = true;
        for (var j in this.state.unseenMemes) {
          if (newResults[i].uid == this.state.unseenMemes[j].uid) newMemeFound = false;
        }

        // new meme so we want to actually update state
        if (newMemeFound) {
          this.setState({ unseenMemes: newResults });
          console.log("setState() b/c newMeme found");
        }
      }
    }.bind(this), function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })
  }

  /**
   * Saves to Firebase that a user liked a meme
   */
  likeMeme = async (memeID, userID) => {
    var resultLikedBy = [];
    var resultSeenBy = [];

    // Get all users who LIKED the meme
    database.ref('memes/' + memeID + '/liked').on('value', function(snapshot) {
      let likedBy = snapshot.val();
      for (var index in likedBy) {
        resultLikedBy.push(likedBy[index]);
      };
    });

    // Get all users who have SEEN the meme
    database.ref('memes/' + memeID + '/seen').on('value', function(snapshot) {
      let seenBy = snapshot.val();
      for (var index in seenBy) {
        resultSeenBy.push(seenBy[index]);
      };
    });

    // Add user to list
    resultLikedBy.push(userID);
    resultSeenBy.push(userID);

    // Save to Firebase
    var likedRef = database.ref('memes/' + memeID + '/liked');
    var seenRef = database.ref('memes/' + memeID + '/seen');
    likedRef.set(resultLikedBy);
    seenRef.set(resultSeenBy);
  }

  /**
   * Saves to Firebase that a user disliked a meme
   */
  dislikeMeme = async (memeID, userID) => {
    var resultDislikedBy = [];
    var resultSeenBy = [];

    // Get all users who LIKED the meme
    database.ref('memes/' + memeID + '/disliked').on('value', function(snapshot) {
      let dislikedBy = snapshot.val();
      for (var index in dislikedBy) {
        resultDislikedBy.push(dislikedBy[index]);
      };
    });

    // Get all users who have SEEN the meme
    database.ref('memes/' + memeID + '/seen').on('value', function(snapshot) {
      let seenBy = snapshot.val();
      for (var index in seenBy) {
        resultSeenBy.push(seenBy[index]);
      };
    });

    // Add user to list
    resultDislikedBy.push(userID);
    resultSeenBy.push(userID);

    // Save to Firebase
    var dislikedRef = database.ref('memes/' + memeID + '/disliked');
    var seenRef = database.ref('memes/' + memeID + '/seen');
    dislikedRef.set(resultDislikedBy);
    seenRef.set(resultSeenBy);
  }
 
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CardStack
          style={styles.content}
          renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text>}
          ref={swiper => {
            this.swiper = swiper
          }}
        >
          {this.state.unseenMemes.filter((meme) => {
            for(var i in meme.seen) {
              if(meme.seen[i] == this.state.currentUser.uid) {
                return false
              }
            }
            console.log("Post-Filtered Meme: " + JSON.stringify(meme))
            return true
          }).map((meme, index) => (
            <Card key={index} style={[styles.card, styles.card1]} onSwipedLeft={() => this.dislikeMeme(meme.uid, this.state.currentUser.uid)} onSwipedRight={() => this.likeMeme(meme.uid, this.state.currentUser.uid) }>
              <Image style={styles.listimage} source={{uri : meme.link }}/>
              <Text style={styles.memeText}>{meme.name}</Text>
            </Card>
          ))}
        </CardStack>
 
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.red]} onPress={() => {
              console.log("Touched Dislike");
              this.swiper.swipeLeft();
            }}>
              <Text style = {styles.buttonTextStyle}>noo :(</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
              console.log("Touched Like");
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

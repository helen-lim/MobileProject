'use strict';
import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import Styles from './Styles.js';
import Card from './Card.js';
import { database } from '../Firebase';
import firebase from 'firebase'

export default class CardStack extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allMemes: [],
      currentUser: firebase.auth().currentUser
    };
  }

  componentWillMount() {

    // Start with 3 Memes
    for(let i = 0; i < 3; i++) {
      this.handleAdd();
    }

    console.log("\n\n\n 3 ITERATIONS HAVE PASSED-------------------------------")
  }

  async handleAdd() {
    try {

      database.ref('memes/').on('value', function(snapshot) {
        let parseObject = snapshot.val();

        console.log("\n### handleAdd() BEGINNING ------------------");
        console.log("     ");
        console.log("PARSE OBJECT: " + JSON.stringify(parseObject));
        console.log("     ");

        // find the first Meme not seen by the user yet
        var newMeme = null;
        var verifiedMemeAsNew = false;
        var userID = null;
        var index = 0; // used for debugging

        findMemeLoop:
        for(var i in parseObject) {
          newMeme = parseObject[i];
          console.log("i=" + (index++) + "     MEME: " + newMeme.memeID + "   " + 
            JSON.stringify(newMeme.seenBy) + "   " + 
            JSON.stringify(newMeme.likedBy) + "   " + 
            JSON.stringify(newMeme.dislikedBy));

          // No-one has ever swipped on this meme
          if (newMeme.seenBy === undefined) {
            verifiedMemeAsNew = true;
            break findMemeLoop;
          }

          for (var j in newMeme.seenBy) {
            userID = newMeme.seenBy[j];

            // Current user has never swipped on this meme
            if (userID !== this.state.currentUser.uid) {
              verifiedMemeAsNew = true;
              break findMemeLoop;
            }
          }
        }
  
        // Append the new meme to our current Stack
        if (verifiedMemeAsNew) {

          // Must check that meme isn't already in the list
          // A sequence of || statements will evaluate to TRUE if any statement is true
          var alreadyAdded = this.state.allMemes.reduce((accumulator, currentMeme) => {
            console.log("\n        currentMeme.meme.ID: " + currentMeme.memeID);
            console.log("        newMeme.memeID: " + newMeme.memeID);
            console.log("        newMeme.memeID === currentMeme.memeID: " + (currentMeme.memeID === newMeme.memeID));
            return accumulator || (currentMeme.memeID === newMeme.memeID);
          }, false)

          if (!alreadyAdded) {
            console.log("\n\n  AFTER this.state.allMemes: " + JSON.stringify(this.state.allMemes) + "\n");
            this.setState({
              allMemes: [newMeme, ...this.state.allMemes]
            })
            console.log("\n\n  AFTER this.state.allMemes: " + JSON.stringify(this.state.allMemes) + "\n");
          }
        }
      }.bind(this), function (errorObject) {
        console.log("componentDidMount: The read failed: " + errorObject.code);
      });
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  handleRemove = (index) => {
    let start = this.state.allMemes.slice(0, index);
    let end = this.state.allMemes.slice(index + 1);
    this.setState({
      allMemes: start.concat(end),
    });
    this.handleAdd();
  };

  render() {
    return (
      <FlatList
        style={Styles.cardContainer}
        contentContainerStyle={Styles.cardStack}
        ListEmptyComponent={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text>}
        data={this.state.allMemes}
        renderItem={({item, index}) => (
          <Card
            {...item}
            index={index}
            onSwipe={this.handleRemove}
          />
        )}
        keyExtractor={item => item.memeID}
        scrollEnabled={false}
      />
    );
  }
}

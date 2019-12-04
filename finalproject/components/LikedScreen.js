import * as React from 'react';
import { useState, useEffect } from 'react';
import { Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { storage, database } from './Firebase';
import firebase from 'firebase'
import Memecard from './meme'

export default function LikedScreen(props) {
    const [unseenMemes, setUnseenMemes] = useState([]);
    const [likedMemes, setLikedMemes] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {    
      database.ref('memes/').on('value', function(snapshot) {
        let parseObject = snapshot.val();
        var result = [];
        for(var i in parseObject) {
          result.push(parseObject[i]);
        }
        setUnseenMemes(result);
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      })
      setCurrentUser(firebase.auth().currentUser)
    },[]);
  
    return (
      <View style={styles.container}>
        <View style={styles.submitContainer2}>
          <View style = {styles.submitTextContainer}>
            <Text style = {styles.submitText}>memes that have brought you joy</Text>
          </View>
          <View style = {styles.submissionsBox}>
            <ScrollView style={{ width: '100%', height: 400,}} >
            {unseenMemes.filter((meme) => {
                for(var i in meme.liked) {
                  if(meme.liked[i] == (currentUser && currentUser.uid)){
                    return true
                  }
                }
                return false
              }).map((meme, index) => (
                <View style={styles.subcontainer3}>
                  <Memecard uri={meme.link} name={meme.name}/>
                </View>
              ))}
        </ScrollView>
          </View>
        </View>
        </View>
    );
  }
  const styles = StyleSheet.create({
    container :{
      flex:1,
      justifyContent : 'center'
    },
    subcontainer3: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
    }, 
    submissionsBox : {
      width: '80%',
      height : '100%',
      borderWidth : 4,
      borderColor : '#707A7E',
      borderStyle: 'solid',
    },
    submitContainer2 : {
      flexDirection : 'column',
      alignItems: 'center',
      width: '100%',
      height: '70%',
    },
    submitButton : {
      width: 100,
      height: 31,
      top: 8,
    },
    submitButtonText : {
      fontFamily: 'Roboto',
      fontSize: 15,
      lineHeight: 21,
      textAlign: 'center',
  
      color: '#707A7E', 
    },
    submitUserText : {
      width: 176,
      height: 31,
    },
    submitTextContainer : {
      width: 300,
      height: 38,
    },
    submitText : {
      fontFamily : 'sans-serif-medium',
      fontSize : 20,
      fontStyle : 'italic',
      color : '#423D39',
  
      textAlign : 'center'
    },
  })
/*
          <View style={styles.subcontainer1}>
            <Text style={styles.paragraph}>
              Liked Memes
            </Text>
            <ScrollView style={{marginHorizontal: 30, width: '90%', height: 400,}} >
              {unseenMemes.filter((meme) => {
                for(var i in meme.liked) {
                  if(meme.liked[i] == (currentUser && currentUser.uid)){
                    return true
                  }
                }
                return false
              }).map((meme, index) => (
                <View style={styles.subcontainer3}>
                  <Memecard uri={meme.link} name={meme.name}/>
                </View>
              ))}
            </ScrollView>
          </View>

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
    subcontainer3: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
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
*/
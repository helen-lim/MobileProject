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
        <View style={styles.userContainer}>
          <Image style = {styles.backgroundStyle} source={require('../assets/kitchen_orange.png')} />
          <View style={styles.userTextContainer}>
            <Text style={styles.userText}>memes that have brought you joy</Text>
          </View>
        </View>

        <View style={styles.submitContainer2}>
          <View style = {styles.submissionsBox}>
            <ScrollView style={{ width: '100%', height: '100%',}} >
            {unseenMemes.filter((meme) => {
                for(var i in meme.likedBy) {
                  if(meme.likedBy[i] == currentUser.uid) {
                    return true
                  }
                }
                return false
              }).map((meme, index) => (
                <View key={index} style={styles.subcontainer3}>
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
      flex: 1,
      flexDirection: 'column',
      //marginTop: 30,
      backgroundColor: '#f7f7f7',
      alignItems: 'center',
    },
    userContainer :{
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      height : '15%',
      backgroundColor : '#F5B988'
    },
    backgroundStyle : {
      position: 'absolute',
      width: 50,
      height: 50,
      left: '85%',
      top : '60%'
    },
    userTextContainer : {
      width: '100%',
      height: 35,
    },
    userText: {
      fontSize : 20,
      fontStyle : 'normal',
      color : '#423D39',
      fontWeight : 'bold',
  
      textAlign : 'center'
    },
    logoutButtonContainer : {
      width: 105,
      height: 25,
  
    },
    logoutButtonTextContainer : {
      width: 105,
      height: 25,
      borderRadius : 10,
      backgroundColor: '#D7823B',
    },
    logoutButtonText : {
      fontSize : 20,
      fontStyle : 'italic',
      color : '#423D39',
      textAlign : 'center'
    },
    subcontainer3: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
    }, 
    submissionsBox : {
      width: '80%',
      height : '80%',
      top : '3%',
      borderWidth : 4,
      borderColor : '#707A7E',
      borderStyle: 'solid',
    },
    submitContainer2 : {
      flexDirection : 'column',
      alignItems: 'center',
      width: '100%',
      height: '90%',
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
      top : 10,
    },
    submitText : {
      fontSize : 20,
      fontStyle : 'italic',
      color : '#423D39',
  
      textAlign : 'center'
    },
  })

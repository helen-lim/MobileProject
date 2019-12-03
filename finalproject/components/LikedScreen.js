import * as React from 'react';
import { useState, useEffect } from 'react';
import { Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { storage, database } from './Firebase';

export default function LikedScreen(props) {
    const [unseenMemes, setUnseenMemes] = useState([]);
    const [likedMemes, setLikedMemes] = useState([]);
  
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
    },[]);
  
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
              {unseenMemes.map((meme, index) => (
                <View style={styles.subcontainer3} key={index}>
                  <Image style={styles.listimage} source={{uri : meme.link }}/>
                  <Text>{meme.name} {meme.creator}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
    );
  }

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
  
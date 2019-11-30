import * as React from 'react';
import { useState, useEffect } from 'react';
import { Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Carousel from 'simple-carousel-react-native';
import { storage, database } from './Firebase';

export default function HomeScreen(props) {
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
        <View style={styles.header}>
          <Text style={styles.headertext}> MemeDer </Text>
        </View>
        <View style={styles.subcontainer1}>
          <Carousel color='black' height={300} showBubbles={false} >
            <View style={styles.subcontainer2}>
              <Image style={styles.memeimage} source={require('../assets/pepe.jpg')} resizeMode="contain"/>
            </View>
            <View style={styles.subcontainer2}>
              <Image style={styles.memeimage} source={require('../assets/womanyellingcat.jpg')} resizeMode="contain"/>
            </View>
            <View style={styles.subcontainer2}>
              <Image style={styles.memeimage} source={require('../assets/galaxybrain.jpg')} resizeMode="contain"/>
            </View>
          </Carousel> 
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
    subcontainer2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }, 
    memeimage: {
      flex: 1,
      alignSelf: 'stretch',
      width: '100%',
      height: undefined,
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
  });
  
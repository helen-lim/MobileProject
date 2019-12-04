import * as React from 'react';
import { useState, useEffect } from 'react';
import { Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { storage, database } from './Firebase';
import firebase from 'firebase'
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
//import { createRequireFromPath } from 'module';
//import Share from 'react-native-share'

export default function Memecard(props) {
  share = async (thisuri) => { 
    FileSystem.downloadAsync(
    thisuri,
    FileSystem.documentDirectory  + '.jpeg'
    )
    .then(({ uri }) => { 
        console.log('Finished downloading to ', uri);

        Sharing.shareAsync(uri); 
    })
    .catch(error => {
      console.error(error); 
    });
  }

  return(
      <View style={styles.container}>
          <Image style={styles.listimage} source={{uri : props.uri }}/>
          <Text style={styles.textstyle}>{props.name}</Text>
          <TouchableOpacity onPress={()=>share(props.uri)}>
            <Image style = {{width:20, height:20}} source={ require('../assets/share.png') } />
          </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '5%',
    }, 
    listimage: {
        flex: 1,
        alignSelf: 'stretch',
        width: 300,
        height:300,
    },
    textstyle: {
      fontFamily : 'sans-serif-medium',
      fontSize : 15,
      fontStyle : 'italic',
      color : '#423D39',
  
      textAlign : 'center'
    }
});
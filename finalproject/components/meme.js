import * as React from 'react';
import { useState, useEffect } from 'react';
import { Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { storage, database } from './Firebase';
import firebase from 'firebase'
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
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
          <Button onPress={()=>share(props.uri)} title="Share" />
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
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center',
      margin: '3%',
    }
});
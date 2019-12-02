import * as React from 'react';
import { useState, useEffect } from 'react';
import { Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { storage, database } from './Firebase';
import firebase from 'firebase'
//import Share from 'react-native-share'

export default function Memecard(props) {
    /*const shareSingleImage = async () => {
        const shareOptions = {
          title: 'Share file',
          url: props.uri,
          failOnCancel: false,
        };
    
        try {
          const ShareResponse = await Share.open(shareOptions);
          setResult(JSON.stringify(ShareResponse, null, 2));
        } catch (error) {
          console.log('Error =>', error);
          setResult('error: '.concat(getErrorString(error)));
        }
      };
*/
    return(
        <View>
            <Image style={styles.listimage} source={{uri : props.uri }}/>
            <Text>{props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
});
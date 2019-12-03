import * as React from 'react';
import { useState, useEffect } from 'react';
import { Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
import { storage, database } from './Firebase';

export default function UserScreen(props) {
  const [unseenMemes, setUnseenMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [submitName, onChangeText] = useState('Meme Name');

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

  writeMemeData = async (creator, liked, link, name, tags) => {
    var memesRef = database.ref('memes/');
    var newMemeRef = memesRef.push();
    return newMemeRef.set({
      creator,
      liked,
      link,
      name,
      tags
    })
  }

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    let test = '1';

    if(!result.cancelled) {
      this.uploadImage(result.uri, submitName)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          this.writeMemeData('Kane', true, url, submitName, []);
          console.log(test);
          Alert.alert('Upload successful!');
        })
      })
    }
  }

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = storage.ref().child("images/" + imageName);
    ref.put(blob)

    return ref.put(blob)
  }

  return (
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={styles.headertext}> MemeDer </Text>
          </View>
          <View style={styles.subcontainer4}>
            <Text style={styles.buttonText}>
              Upload new memes
            </Text>
            <TouchableOpacity onPress={this.onChooseImagePress}>
              <Image style={styles.logo} source={require('../assets/uploadbutton.png')} />
            </TouchableOpacity>
            <TextInput
              style={styles.textinputbox}
              onChangeText={text => onChangeText(text)}
              value={submitName}
            />
          </View>
        </View>
        <View style={styles.subcontainer1}>
          <Text style={styles.paragraph}>
            Submitted Memes
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
  subcontainer4: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    height: '34%',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
    backgroundColor: '#e6eaec',
  },
  textinputbox: { 
    height: 40, 
    width: '60%', 
    marginTop: 10, 
    borderColor: 'gray', 
    borderWidth: 1 
  }
});

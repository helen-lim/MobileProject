import * as React from 'react';
import { useState, useEffect } from 'react';
import { Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
import { storage, database } from './Firebase';
import firebase from 'firebase'
import Memecard from './meme'
import * as Permissions from 'expo-permissions';

export default function UserScreen(props) {
  const [submittedMemes, setSubmittedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [submitName, onChangeText] = useState('Meme Name');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {    
    setCurrentUser(firebase.auth().currentUser)
    database.ref('memes/').on('value', function(snapshot) {
      let parseObject = snapshot.val();
      var result = [];
      for(var i in parseObject) {
        result.push(parseObject[i]);
      }
      setSubmittedMemes(result);
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

  onChooseCameraPress = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status == 'granted') {
      let result = await ImagePicker.launchCameraAsync();
      let test = '1';

      if(!result.cancelled) {
        this.uploadImage(result.uri, submitName)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            this.writeMemeData(currentUser && currentUser.uid, [], url, submitName, []);
            console.log(test);
            Alert.alert('Upload successful!');
          })
        })
      }
    } else {
      Alert.alert('Please enable camera permissions!')
    }
  }

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    let test = '1';

    if(!result.cancelled) {
      this.uploadImage(result.uri, submitName)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          this.writeMemeData(currentUser && currentUser.uid, [], url, submitName, []);
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
          <View style={styles.subcontainer4}>
            <View style={styles.subcontainer5}>
              <TouchableOpacity onPress={this.onChooseImagePress}>
                <Image style={styles.logo} source={require('../assets/uploadbutton.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onChooseCameraPress}>
                <Image style={styles.logo} source={require('../assets/camerabutton.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.buttonText}>
              Upload new memes
            </Text>
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
            {submittedMemes.filter((meme) => {
              return meme.creator == (currentUser && currentUser.uid)
            }).map((meme, index) => (
              <View style={styles.subcontainer3}>
                <Memecard uri={meme.link} name={meme.name}/>
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
    marginTop: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subcontainer4: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    height: '34%',
  },
  subcontainer5: {
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '2%',
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

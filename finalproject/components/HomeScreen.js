import React, {Component} from 'react';
import {  StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { useState, useEffect } from 'react';
import { storage, database } from './Firebase';

import { Gyroscope, Accelerometer, DeviceMotion } from 'expo-sensors';
import { tsConstructSignatureDeclaration } from '@babel/types';
/*
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
*/
export default class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      deviceMotionData: {},
    };
  };
  
  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  _slow = () => {
    DeviceMotion.setUpdateInterval(1000);
  };

  _fast = () => {
    DeviceMotion.setUpdateInterval(16);
  };

  _subscribe = () => {
    this._subscription = DeviceMotion.addListener(result => {
      this.setState({ deviceMotionData: result });
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    let data = this.state.deviceMotionData;
    let rotate = {}
    for (var value in data.rotate){
      rotate[value] = data.rotate[value];
    }
    return (
      <View style={{ flex: 1 }}>
        <View style = {{flex:1, justifyContent:'center', alignItems:'center', width: 300, height: 100, }}><Text>
          Orientation: 
        </Text></View>
        <CardStack
          style={styles.content}
          renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text>}
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwiped={() => console.log('onSwiped')}
          onSwipedLeft={() => console.log('onSwipedLeft')}
        >
          <Card style={[styles.card, styles.card1]}><Text style={styles.label}>
            card
          </Text></Card>
          <Card style={[styles.card, styles.card2]} onSwipedLeft={() => alert('onSwipedLeft')}><Text style={styles.label}>B</Text></Card>
          <Card style={[styles.card, styles.card1]}><Text style={styles.label}>
            card
          </Text></Card>
          <Card style={[styles.card, styles.card2]}><Text style={styles.label}>
            card
          </Text></Card>
          <Card style={[styles.card, styles.card1]}><Text style={styles.label}>
            card
          </Text></Card>
        </CardStack>

        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.red]} onPress={() => {
              this.swiper.swipeLeft();
            }}>
              <Text>Red</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.orange]} onPress={() => {
              this.swiper.goBackFromLeft();
            }}>
              <Text>blue</Text>  
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
              this.swiper.swipeRight();
            }}>
              <Text>Blue</Text>  
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
};
function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    width: 320,
    height: 470,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  footer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer:{
    width:220,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 0,
  },
  orange:{
    width:55,
    height:55,
    borderWidth:6,
    borderColor:'rgb(246,190,66)',
    borderRadius:55,
    marginTop:-15
  },
  green:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:6,
    borderColor:'#01df8a',
  },
  red:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:6,
    borderColor:'#fd267d',
  }
});

/*
import * as React from 'react';
import {useRef} from 'react';
import { useState, useEffect } from 'react';
import { Platform, SafeAreaView, Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Carousel from 'simple-carousel-react-native';
import { storage, database } from './Firebase';

import Swiper from 'react-native-deck-swiper'
import { Card } from '../components/Card'

import Styles from './Styles.js';
import CardStack from './CardStack.js';
 
const HomeScreenPics = [
  {
    pic: require('../assets/pepe.jpg'),
    title: 'pepe',
    caption: 'the pepe meme',
  },
  {
    pic: require('../assets/pepe.jpg'),
    title: 'pepe',
    caption: 'pepe again!',
  },
  {
    pic: require('../assets/galaxybrain.jpg'),
    title: 'galaxy brain',
    caption: 'the brain of the galaxy',
  },
]  
export default function HomeScreen(props) {
  const [unseenMemes, setUnseenMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);

  const useSwiper = useRef(null).current
  const handleOnSwipedLeft = () => useSwiper.swipeLeft()
  const handleOnSwipedTop = () => useSwiper.swipeTop()
  const handleOnSwipedRight = () => useSwiper.swipeRight()

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
    <View style={Styles.container}>
      <CardStack />
    </View>
  )
}
*/
/*
  swipeLeft = () => {
    this.swiper.swipeLeft()
  };
  onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }
  return (
    <Swiper
    ref={swiper => {
      this.swiper = swiper
    }}
    onSwiped={() => this.onSwiped('ive been swiped')}
    onTapCard={this.swipeLeft}
    cards={HomeScreenPics}
    renderCard={Card}
    infinite 
    backgroundColor="white"
    cardHorizontalMargin={0}
    stackSize={2} 
    useViewOverflow={Platform.OS === 'ios'}
    >
    <Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' />
    </Swiper>
  )
}
*/
/*
    <View
      style={styles.container}
    >
      <View style={styles.swiperContainer}>
        <Swiper
          ref={useSwiper}
          animateCardOpacity
          containerStyle={styles.container}
          cards={HomeScreenPics}
          renderCard={card => <Card card={card} />}
          cardIndex={0}
          backgroundColor="white"
          stackSize={2}
          infinite
          showSecondCard
          animateOverlayLabelsOpacity
          overlayLabels={{
            left: {
              title: 'NOPE',
              element: <Overlay label="NOPE" color="#E5566D" />,
              style: {
                wrapper: styles.overlayWrapper,
              },
            },
            right: {
              title: 'LIKE',
              element: <Overlay label="LIKE" color="#4CCC93" />,
              style: {
                wrapper: {
                  ...styles.overlayWrapper,
                  alignItems: 'flex-start',
                  marginLeft: 30,
                },
              },
            },
          }}
        useViewOverflow={Platform.OS === 'ios'}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <IconButton
          name="close"
          onPress={handleOnSwipedLeft}
          color="white"
          backgroundColor="#E5566D"
        />
        <IconButton
          name="star"
          onPress={handleOnSwipedTop}
          color="white"
          backgroundColor="#3CA3FF"
        />
        <IconButton
          name="heart"
          onPress={handleOnSwipedRight}
          color="white"
          backgroundColor="#4CCC93"
        />
      </View>
    </View>
  )
}

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  swiperContainer: {
    height: height - 250,
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '15%',
  },
  copyright: {
    textAlign: 'center',
    fontSize: 10,
    color: 'black',
    paddingBottom: 20,
  },
  overlayWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: -30,
  },
})
*/
/*
<Swiper
  cards={HomeScreenPics}
  renderCard={Card}
  infinite 
  backgroundColor="white"
  cardHorizontalMargin={0}
  stackSize={2} 
  useViewOverflow={Platform.OS === 'ios'}
/>
*/
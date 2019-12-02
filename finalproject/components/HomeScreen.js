import * as React from 'react';
import {useRef} from 'react';
import { useState, useEffect } from 'react';
import { Platform, SafeAreaView, Picker,Image, Button, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Carousel from 'simple-carousel-react-native';
import { storage, database } from './Firebase';

import Swiper from 'react-native-deck-swiper'
import { Card } from '../components/Card'
import { IconButton } from '../components/IconButton'
import { Overlay } from '../components/Overlay'
 
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
    <Swiper
  cards={HomeScreenPics}
  renderCard={Card}
  infinite 
  backgroundColor="white"
  cardHorizontalMargin={0}
  stackSize={2} 
  useViewOverflow={Platform.OS === 'ios'}
/>
  )
}
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
      <View style={styles.swipeTextContainer}>
        <Text
          style={styles.copyright}
        >
            All pictures were taken freerly from Unsplash.com.
            Names on the Photos are the names of photographers who took pictures.
        </Text>
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
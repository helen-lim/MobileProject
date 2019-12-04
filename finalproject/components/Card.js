import React from 'react'
import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Tile } from 'react-native-elements'

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
}

export const Card = ({ pic, title, caption }) => (
  <Tile
    imageSrc={{ uri: pic }}
    imageContainerStyle={styles.imageContainer}
    activeOpacity={0.9}
    title={title}
    titleStyle={styles.title}
    caption={caption}
    captionStyle={styles.caption}
    containerStyle={styles.container}
    featured
  />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: Layout.window.width - 30,
    height: Layout.window.height - BOTTOM_BAR_HEIGHT * 6,
    borderRadius: 20,
    overflow: 'hidden', 
  },
  title: {
    position: 'absolute',
    left: 10,
    bottom: 30,
  },
  caption: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
})
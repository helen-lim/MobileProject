'use strict';
import { StyleSheet, Dimensions } from 'react-native';

const DIMENSIONS = Dimensions.get('window');

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  cardContainer: {
    flex: 1,
    width: DIMENSIONS.width
  },
  cardStack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    height: 500,
    width: 350,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  cardImage: {
    flex: 1,
    backgroundColor: '#1E90FF'
  },
  cardText: {
    //margin: 20,
    height : '10%',
    justifyContent : 'center',
    backgroundColor : '#F5B988',
  },
  cardTextMain: {
    textAlign: 'left',
    fontSize: 20,
    backgroundColor: 'transparent',
    left : 10,
    fontStyle : 'italic',
    fontWeight : 'bold'
  },
  cardTextSecondary: {
    textAlign: 'left',
    fontSize: 15,
    color: 'grey',
    backgroundColor: 'transparent'
  },
  sideColors: {
    borderLeftColor: '#d67067',
    borderRightColor: '#66d48b',
    borderWidth: 6,
    borderRadius: 10,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  }
});

export default Styles;

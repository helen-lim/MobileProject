/**
 * Created By: Brad Knaysi
 * File: MapScreen.js
 * Purpose: See where they are, and TODO: see memes on the map
 */

import * as React from 'react';
import { Text, Button, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { database } from './Firebase';
import memoize from 'memoize-one';


export default class MapScreen extends React.Component {

    state = {
        latitude: 38.0377,
        longitude: 78.5024,
        memes: []
    }

    // Constants
    latitudeDelta = 0.0722;
    longitudeDelta = 0.0221;

    /**
     * Geolocation API (Navigator.geolocation) is built in functionality
     * "memoize" keeps function pure and thus eliminates unneccessary re-renders
     */
    getCurrentLocation = memoize(mapView => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude, 
                    longitude: position.coords.longitude
                });
                this.mapView.animateToRegion({
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: this.latitudeDelta,
                    longitudeDelta: this.longitudeDelta,
                }, 500);

                console.log("Latitude: " + this.state.latitude);
                console.log("Longitude: " + this.state.longitude);
            },
            (error) => { 
                console.log("ERROR: " + error.message) 
            },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    })

    /**
     * Used to fetch memes from Firebase
     */
    componentDidMount() {
        database.ref('memes/').on('value', function(snapshot) {
            let parseObject = snapshot.val();
            var result = [];
            for(var i in parseObject) {
              result.push(parseObject[i]);
            }
            this.setState({ memes: result });
        }.bind(this), function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView 
                        ref={map => {this.mapView = map}}
                        style={styles.mapStyle}
                        showsUserLocation={true}
                        followUserLocation={true}
                        initialRegion={{
                            latitude: 38.04057540975783,
                            longitude: -78.50022601271456,
                            latitudeDelta: this.latitudeDelta,
                            longitudeDelta: this.longitudeDelta,
                        }}
                    >
                        {this.state.memes.map((meme, index) => ( 
                            <Marker 
                                key={index} 
                                title={meme.name}
                                coordinate={meme.coordinate} 
                            /> 
                        ))}
                    </MapView>
                </View>
                {/* <View style={styles.currentLocationButton}>
                    <Button
                        title = "Current Location Button"
                        onPress = {this.getCurrentLocation}
                    />
                </View> */}
                <TouchableOpacity onPress={this.getCurrentLocation} style={styles.currentLocationButton} >
                    <Image
                        style={styles.image}
                        source={require('../assets/current-location-icon.png')}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    mapContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 40,
    },
    currentLocationButton: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    image: {
        flex: 1,
        width: 60,
        height: 60,
        resizeMode: 'contain'
    }
});
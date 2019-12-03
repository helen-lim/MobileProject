/**
 * Created By: Brad Knaysi
 * File: MapScreen.js
 * Purpose: See where they are, and TODO: see memes on the map
 */

import * as React from 'react';
import { Text, Button, View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import memoize from 'memoize-one';


export default class MapScreen extends React.Component {

    state = {
        latitude: 38.0377,
        longitude: 78.5024
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

                console.log(this.state);
            },
            (error) => { 
                console.log("ERROR: " + error.message) 
            },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    })

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
                    />
                </View>
                <View>
                    <Button
                        title = "Current Location Button"
                        onPress = {this.getCurrentLocation}
                    />
                </View>
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
});
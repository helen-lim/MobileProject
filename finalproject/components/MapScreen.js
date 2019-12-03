/**
 * Created By: Brad Knaysi
 * File: MapScreen.js
 * Purpose: See where they are, and TODO: see memes on the map
 */

import * as React from 'react';
import { Text, Button, View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';


export default function MapScreen(props) {

    /**
     * Geolocation API (Navigator.geolocation) gets access to the current location of the device.
     */
    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
            },
            (error) => { console.log("ERROR: " + error.message) },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView style={styles.mapStyle} />
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
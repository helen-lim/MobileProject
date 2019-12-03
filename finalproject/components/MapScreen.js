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

    /**
     * Geolocation API (Navigator.geolocation) is built in functionality
     */
    getCurrentLocation = memoize(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude, 
                    longitude: position.coords.longitude
                });
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
                        style={styles.mapStyle}
                        initialRegion={{
                            latitude: 38.04057540975783,
                            longitude: -78.50022601271456,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={this.state}
                        />
                    </MapView>
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
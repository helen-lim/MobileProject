/**
 * Created By: Brad Knaysi
 * File: MapScreen.js
 * Purpose: See where they are, and TODO: see memes on the map
 */

import * as React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';


export default function MapScreen(props) {

    getCurrentLocation = () => {
        let currentLocation = navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                console.log(location);
                return location;
            }, 
            error => {
                return Alert.alert(error.message);
            }, 
            { 
                enableHighAccuracy: true, 
                timeout: 20000, 
                maximumAge: 1000 
            },
        )
        console.log(currentLocation);
    }

    return (
        <View style={styles.container}>
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
        padding: 10,
        flex: 1,
        justifyContent: 'space-around',
    }
});
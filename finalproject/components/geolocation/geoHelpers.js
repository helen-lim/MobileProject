/**
 * Created By: Brad Knaysi
 * File: geoHelpers.js
 * Purpose: Functions to help the built in web-browser Geolocation API (Navigator.geolocation) access to the location of the device.
 */


export function getGeoOptions() {

    // Standard configuration for Navigator.geolocation
    const geoOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
  return geoOptions;
}
  
/**
 * Callback function for a Navigator.geolocation successful result
 * @param {Postion} pos is the result
 */
export function success(pos) {
    var crd = pos.coords;
    console.log('Your current position is:');``
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

/**
 * Callback function for a Navigator.geolocation failed result
 * @param {PostionError} err is the error
 */
export function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
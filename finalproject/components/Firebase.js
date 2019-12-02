import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB6Fnon0O-_MfmPUwZ1ZUeAuqvzsKLAjFk",
    authDomain: "final-project-e1ed8.firebaseapp.com",
    databaseURL: "https://final-project-e1ed8.firebaseio.com",
    projectId: "final-project-e1ed8",
    storageBucket: "final-project-e1ed8.appspot.com",
    messagingSenderId: "113481072697",
    appId: "1:113481072697:web:55d5c5b63d4ab5cafdcde8",
    measurementId: "G-7MHKR4J3NM"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export var auth = firebase.auth();
export var storage = firebase.storage();
export var database = firebase.database();
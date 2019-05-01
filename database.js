var firebase = require("firebase");

const { FIREBASE_API_KEY } = process.env
const { FIREBASE_DOMAIN } = process.env
const { FIREBASE_BASE_URL } = process.env
const { FIREBASE_ID } = process.env
const { FIREBASE_BUCKET } = process.env
const { FIREBASE_SENDER } = process.env

// Initialize Firebase
var config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_DOMAIN,
    databaseURL: FIREBASE_BASE_URL,
    projectId: FIREBASE_ID,
    storageBucket: FIREBASE_BUCKET,
    messagingSenderId: FIREBASE_SENDER
};
firebase.initializeApp(config);

var database = firebase.database();

module.exports = database;
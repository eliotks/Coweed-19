import * as firebase from "firebase/app";

/**
 * Connects to the firebase database.
 */
export function initialize_firebase() {

    const firebaseConfig = {
        apiKey: "AIzaSyCGqpWEpCRxVWJLvnGvv6weHmpteQrWNVw",
        authDomain: "chessbase-75006.firebaseapp.com",
        databaseURL: "https://chessbase-75006.firebaseio.com",
        projectId: "chessbase-75006",
        storageBucket: "chessbase-75006.appspot.com",
        messagingSenderId: "284072651792",
        appId: "1:284072651792:web:de42af34a6b4ee55f7ee95",
        measurementId: "G-RM3Q21T3L2"
    };

    firebase.initializeApp(firebaseConfig);
}

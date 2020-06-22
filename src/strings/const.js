import * as firebase from 'firebase'
export var config = {
    apiKey: "AIzaSyAf0t98Q8Oj2B2va6sxtrgp_AEdpelD69U",
    authDomain: "cervezafortuna-4217e.firebaseapp.com",
    databaseURL: "https://cervezafortuna-4217e.firebaseio.com/",
    projectId: "cervezafortuna-4217e",
    storageBucket: "cervezafortuna-4217e.appspot.com",
  };

  firebase.initializeApp(config);

  export const ref = firebase.database().ref();
  export const firebaseAuth = firebase.auth();

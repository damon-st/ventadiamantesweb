importScripts('https://www.gstatic.com/firebasejs/6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.1/firebase-messaging.js');



firebase.initializeApp({
    apiKey: "AIzaSyDG_oSMjtkYkhGqlSzc25VaEb6DI3Roupk",
    authDomain: "ventadiamantes-329aa.firebaseapp.com",
    databaseURL: "https://ventadiamantes-329aa.firebaseio.com",
    projectId: "ventadiamantes-329aa",
    storageBucket: "ventadiamantes-329aa.appspot.com",
    messagingSenderId: "174716093903",
    appId: "1:174716093903:web:a231a9c2e8ad1c115dfeba",
    measurementId: "G-06CKDSD69C"
});


const messaging = firebase.messaging();
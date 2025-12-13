importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyCchWafOA9UwKogzLV53iHAGL5nq0O83RQ",
    authDomain: "epoch-e8bf1.firebaseapp.com",
    projectId: "epoch-e8bf1",
    storageBucket: "epoch-e8bf1.firebasestorage.app",
    messagingSenderId: "796262831550",
    appId: "1:796262831550:web:ae25640c7c6148bb1c15ef",
    measurementId: "G-TQFTS1DQME"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Background message:", payload);
});

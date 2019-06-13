
var firebaseConfig = {
    apiKey: "AIzaSyDwQ1l_xlv152z3zsXoCEqVrdy32ZkGtOQ",
    authDomain: "pushservice-de9e2.firebaseapp.com",
    databaseURL: "https://pushservice-de9e2.firebaseio.com",
    projectId: "pushservice-de9e2",
    storageBucket: "pushservice-de9e2.appspot.com",
    messagingSenderId: "53707849923",
    appId: "1:53707849923:web:fd85f9eb2ea64d1c"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BH_ct5AA7O07SFVmUTo8Zmv1loWKDSDP--pcQMeFaN0an8-qg5E8pp4o9WwDQelRUKmJ-SgtTNRsZWd625S9G_Y');

function requestPermission() {
    Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
            messaging.getToken().then(function (currentToken) {
                if (currentToken) {
                    console.log("current token", currentToken)
                } else {
                    console.log('No Instance ID token available. Request permission to generate one.');
                }
            }).catch(function (err) {
                console.log('An error occurred while retrieving token. ', err);
            });
        } else {
            console.log('Unable to get permission to notify.');
        }
    });
}

messaging.onTokenRefresh(function () {
    messaging.getToken().then(function (refreshedToken) {
        console.log('Token refreshed.', refreshedToken);
    }).catch(function (err) {
        console.log('Unable to retrieve refreshed token ', err);
    });
});

messaging.onMessage(function (payload) {
    console.log('Message received. ', payload);
});

requestPermission()

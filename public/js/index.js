import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyA13tKR3qx7SHee9mbcic6r4IpmctfoNBA",
    authDomain: "nanua-global.firebaseapp.com",
    projectId: "nanua-global",
    storageBucket: "nanua-global.appspot.com",
    messagingSenderId: "274735679365",
    appId: "1:274735679365:web:94feb0af6b0e86913326ec",
    measurementId: "G-WZYLSG35NJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth.Auth.Persistence.LOCAL;


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        document.getElementById("auth-dashboard").style.display = "block";
        document.getElementById("login_div").style.display = "none";
    } else {
        // No user is signed in.
        document.getElementById("auth-dashboard").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
});

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {

            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("errorMessage");
        });
};


function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
};

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
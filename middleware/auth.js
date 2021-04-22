var firebase = require('firebase');

module.exports = {
    isAuthenticated: function(req, res, next) {
        var user = firebase.auth().currentUser;
        if (user !== null) {
            req.user = user;
            res.render('dashboard')
            next();
        } else {
            res.redirect('/login');
        }
    },
    signIn: function(req, res, next) {
        console.log('sign in function going on');
        var email = req.body.email;
        var password = req.body.password;
        firebase.auth().signInWithEmailAndPassword(email.toString(), password.toString())
            .then((userCredential) => {

                // Signed in
                var user = userCredential.user;
                // window.alert("Hi, Welcome !")
                next();
            })
            .catch((error) => {

                var errorCode = error.code;
                var errorMessage = error.message;
                // window.alert(errorMessage);
            });
    },
    signOut: function(req, res, next) {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            next();
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }
}
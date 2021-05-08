const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
// import forms from './dbForms.js'

// const logger = require("./middleware/logger");
const connectDB = require('./config/db.js');
const mongoConnect = require('./util/database').mongoConnect;
const methodOverride = require('method-override');


// Load config
dotenv.config({ path: './config/config.env' })
mongoose.set('useCreateIndex', true);

// connectDB(); // Mongo Stuff

// App Config
const app = express();
const PORT = process.env.PORT || 8001;

// Auth Config
var firebase = require('firebase');
require('firebase/app');
require('firebase/auth');
require('firebase/database');
// Initialize Firebase for the application
var config = {
    // apiKey: process.env.apiKey,
    apiKey: "AIzaSyA13tKR3qx7SHee9mbcic6r4IpmctfoNBA",
    authDomain: process.env.authDomain,
    // databaseURL: process.env.databaseURL,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
};

firebase.initializeApp(config);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


app.set('view engine', 'ejs');

app.use('/', require('./routes/index.js'));

app.use(express.static(path.join(__dirname, 'public'))); // static path
// app.use(logger);






mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    })
    .catch(err => console.log(err));


// App Endpoints
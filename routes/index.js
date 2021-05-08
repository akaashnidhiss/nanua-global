const express = require('express');
const path = require('path');
const router = express.Router();
const ContactControls = require('../controllers/ContactControls');
const AnnouncementControls = require('../controllers/AnnouncementControls');
const AnnouncementInfo = require('../models/Announcements');
const authenticate = require('../middleware/auth');

// @desc Login/Landing page
// @route GET /
router.get('/', function(req, res) {
    res.render('home');
})
router.get('/home', function(req, res) {
    res.render('home');
})

// @desc Contact page
// @route GET /contact
router.get('/mail', function(req, res) {
    res.render('mail');
})

// @desc Courses page
// @route GET /courses
router.get('/courses', function(req, res) {
    res.render('courses');
})

// @desc About page
// @route GET /about
router.get('/blog', function(req, res) {
    res.render('blog');
})
router.get('/services', function(req, res) {
    res.render('services');
})
router.get('/counselling', function(req, res) {
    res.render('counselling');
})
router.get('/tos', function(req, res) {
    res.render('tos');
})


// @desc Register page
// @route GET /register
router.get('/register', function(req, res) {
    res.render('register');
})

// @desc Login page
// @route GET /login
router.get('/login', function(req, res) {
    res.render('login');
})

router.post('/login', authenticate.signIn, function(req, res, next) {
    res.redirect('/dashboard')
})

// @desc Logout page
// @route GET /logout
router.get('/logout', authenticate.signOut, function(req, res) {

    res.redirect('/');
})

// @desc Dashboard page
// @route GET /dashboard
router.get('/dashboard', authenticate.isAuthenticated, AnnouncementControls.getDashboardData)



// @desc Post Announcements from Dash
// @route GET /dashboard/announcement
router.post('/dashboard/announcement', AnnouncementControls.postAnnouncement);

// @desc Get all Announcements to Announcements page
// @route GET /dashboard/announcement
router.get('/announcements', AnnouncementControls.getAnnouncements);

// @desc Delete Announcement
// @route Delete /:id
// router.delete('/:id', AnnouncementControls.deleteAnnouncements)

router.delete('/:id', async(req, res) => {
    await AnnouncementInfo.findByIdAndDelete(req.params.id);
    res.redirect('/announcements');

})


// @desc Submitting Email for newsletter
// @route POST /email
router.post('/email', ContactControls.postEmail);

// @desc Submitting Contact Info
// @route POST /contact
router.post('/contact', ContactControls.postContacts);


// @desc Send me an email
// @route GET /sendemail
router.get('/sendemail', ContactControls.sendEmail);

module.exports = router;
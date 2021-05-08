const AnnouncementInfo = require('../models/Announcements');


exports.postAnnouncement = async(req, res, next) => {
    let announcement = new AnnouncementInfo({
        title: req.body.title,
        description: req.body.description
    });
    console.log(announcement);

    const Announce = await announcement.save();
    const AllAnnounce = await AnnouncementInfo.find().sort({ createdAt: 'desc' });
    res.render('Announcement', { announcements: AllAnnounce });


}

exports.getAnnouncements = async(req, res, next) => {
    const AllAnnounce = await AnnouncementInfo.find().sort({ createdAt: 'desc' });
    res.render('Announcement', { announcements: AllAnnounce });

}

exports.getDashboardData = async(req, res, next) => {
    const AllAnnounce = await AnnouncementInfo.find().sort({ createdAt: 'desc' });
    res.render('dashboard', { announcements: AllAnnounce });

}



exports.deleteAnnouncements = async(req, res, next) => {
    await AnnouncementInfo.findByIdAndDelete(req.params.id);
    res.redirect('/announcements');


}
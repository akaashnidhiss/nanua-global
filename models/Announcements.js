const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({
    title: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
    }

})





module.exports = mongoose.model('Announcement', AnnouncementSchema);
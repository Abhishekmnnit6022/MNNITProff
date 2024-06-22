const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    }, 
    class:{
        type: String,
        required: true
    }
  
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
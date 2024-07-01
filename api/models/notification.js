const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true });

const getNotificationModel = (department, semester) => {
    const collectionName = `${department}_${semester}_Notifications`;
    return mongoose.model(collectionName, notificationSchema);
};

module.exports = getNotificationModel;
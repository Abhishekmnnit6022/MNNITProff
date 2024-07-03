const mongoose = require('mongoose');

const classScheduleSchema = new mongoose.Schema({
    branchID: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const classSchedule = mongoose.model('ClassSchedule', classScheduleSchema, 'classschedules'); 

module.exports = classSchedule;
